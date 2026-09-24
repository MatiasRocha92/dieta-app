-- Ejecutar una vez en el SQL Editor de tu proyecto de Supabase.
-- Cada usuario accede únicamente a sus propias filas.
create table if not exists public.diet_records (
 user_id uuid not null references auth.users(id) on delete cascade,
 section text not null check(section in ('days','weeks','measurements')),
 record_key text not null check(record_key ~ '^\d{4}-\d{2}-\d{2}$'),
 value jsonb,
 version integer not null default 1,
 updated_at timestamptz not null default now(),
 primary key(user_id,section,record_key)
);
alter table public.diet_records enable row level security;
drop policy if exists "Read own records" on public.diet_records;
create policy "Read own records" on public.diet_records for select to authenticated using ((select auth.uid()) = user_id);
drop policy if exists "Insert own records" on public.diet_records;
create policy "Insert own records" on public.diet_records for insert to authenticated with check ((select auth.uid()) = user_id);
drop policy if exists "Update own records" on public.diet_records;
create policy "Update own records" on public.diet_records for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
revoke all on public.diet_records from anon, authenticated;
grant select,insert,update on public.diet_records to authenticated;
create or replace function public.save_diet_record(p_section text,p_key text,p_value jsonb,p_expected_version integer)
returns integer language plpgsql security invoker set search_path = '' as $$
declare next_version integer;
begin
 if auth.uid() is null then raise exception 'AUTH_REQUIRED'; end if;
 if p_section not in ('days','weeks','measurements') or p_key !~ '^\d{4}-\d{2}-\d{2}$' then raise exception 'INVALID_RECORD'; end if;
 if octet_length(coalesce(p_value::text,'')) > 50000 then raise exception 'RECORD_TOO_LARGE'; end if;
 if p_expected_version=0 then
  insert into public.diet_records(user_id,section,record_key,value,version)
  values(auth.uid(),p_section,p_key,p_value,1) on conflict do nothing returning version into next_version;
 else
  update public.diet_records set value=p_value,version=version+1,updated_at=now()
  where user_id=auth.uid() and section=p_section and record_key=p_key and version=p_expected_version
  returning version into next_version;
 end if;
 if next_version is null then raise exception 'VERSION_CONFLICT'; end if;
 return next_version;
end $$;
revoke all on function public.save_diet_record(text,text,jsonb,integer) from public, anon;
grant execute on function public.save_diet_record(text,text,jsonb,integer) to authenticated;
