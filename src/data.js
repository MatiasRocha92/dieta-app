export const dayNames=['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'];
export const shifts=['Normal','Guardia','Guardia nocturna'];
export const activities=['Descanso','Gimnasio','Correr'];
export const mealNames=['Desayuno','Almuerzo','Merienda','Cena'];
export const menus=[
 ['Huevos revueltos, tostadas y banana','Pollo con arroz y ensalada','Yogur con fruta','Omelette con ensalada fresca'],
 ['Yogur, avena y banana','Carne picada con arroz y verduras','Huevos duros y manzana','Pollo a la plancha con papa chica'],
 ['Huevos, tostadas y fruta','Milanesas al horno con puré y ensalada','Mate o café con tostadas','Carne magra con ensalada'],
 ['Huevos revueltos, pan y fruta','Pollo al horno con papa y ensalada','Yogur con banana','Omelette con tomate y arroz'],
 ['Leche, avena y fruta','Hamburguesas caseras con batata','Huevos duros y fruta','Pollo salteado con verduras y arroz'],
 ['Huevos, tostadas y fruta','Fideos con salsa casera y carne','Yogur o leche con fruta','Tortilla de papa con ensalada'],
 ['Huevos, tostadas y fruta','Arroz con pollo o guiso de lentejas','Tostadas con yogur o fruta','Carne magra con ensalada y papa chica']];
export const portions=['2–3 huevos · 2 tostadas · 1 fruta. Si elegís lácteos: 1 vaso o pote y 4 cucharadas de avena.','Proteína + arroz, fideos, papa o batata + medio plato de verduras. Consultá las porciones en Alimentos.','Una opción del menú, según lo que tengas preparado.','Porción moderada, con poca grasa. Si entrenaste tarde, conservá una porción chica de arroz, papa o pan.'];
export const foods=[
 {name:'Proteínas',icon:'egg',items:[['Pollo o carne magra','180–220 g en crudo, sin hueso, por comida como referencia.'],['Huevos','2–3 unidades en una preparación.'],['Atún opcional','1 lata escurrida; revisá el tamaño.'],['Lentejas','¾–1 taza cocida. También aportan carbohidratos.'],['Leche o yogur','1 vaso de 200–250 ml o 1 pote de 170–200 g.']]},
 {name:'Carbohidratos',icon:'wheat',items:[['Arroz o fideos','½–1 taza cocida.'],['Papa o batata','1 mediana o 250–300 g para el almuerzo.'],['Pan o avena','2 tostadas o 4 cucharadas de avena.'],['En la cena','½ taza de arroz, 1 papa chica o 1 tostada, si corresponde.']]},
 {name:'Verduras',icon:'carrot',items:[['Para ensalada','Tomate, lechuga, zanahoria, cebolla, repollo y pepino.'],['Para cocinar','Cebolla, zanahoria, morrón, tomate y arvejas.'],['Porción orientativa','½ plato de verduras en almuerzo y cena.']]},
 {name:'Frutas y otros',icon:'apple',items:[['Fruta de estación','1 unidad mediana por porción: banana, manzana, naranja o mandarina.'],['Aceite','Medido al condimentar y cocinar.'],['Maní','Un puñado chico, alrededor de 20–30 g.']]}];
export const shopping=[['Huevos','24–30 unidades'],['Pollo','2–3 kg'],['Carne o carne picada','1–1,5 kg'],['Lentejas','Según menú y stock'],['Atún opcional','Según menú'],['Leche y yogur','Según desayunos y meriendas'],['Arroz y fideos','Revisar alacena'],['Papa y batata','Según menú'],['Avena y pan','Revisar stock'],['Verduras','Tomate, lechuga, zanahoria, cebolla, repollo, morrón o pepino'],['Fruta','Banana, manzana, naranja o mandarina'],['Otros','Aceite, vinagre, ajo, condimentos y maní opcional']];
export const preparation=['Cocinar pollo o carne','Preparar arroz o papas','Hervir huevos','Lavar las verduras','Cocinar lentejas si las elegís','Separar porciones y armar tuppers','Refrigerar y congelar las porciones para más adelante'];
export const kit=[['Tupper principal','Pollo con arroz y verduras, o carne con papa.'],['Otra comida, si hace falta','Tortilla de papa y ensalada.'],['1–2 frutas','Banana o manzana para llevar.'],['Colación','Huevos duros o yogur, con frío disponible.'],['Botella de agua','Lista para salir.'],['Bolso térmico','Refrigerantes, cubiertos y recipientes cerrados.']];
export function iso(date){return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;}
export function dateOf(key){return new Date(`${key}T12:00:00`);}
export function plus(key,n){const d=dateOf(key);d.setDate(d.getDate()+n);return iso(d);}
export function monday(key){const d=dateOf(key);return plus(key,-((d.getDay()+6)%7));}
export function dayIndex(key){return (dateOf(key).getDay()+6)%7;}
export function defaultDay(key){return {shift:'Normal',activity:'Descanso',trained:false,done:[false,false,false,false],meals:[...menus[dayIndex(key)]],note:''};}
export function advice(day){return {shift:day.shift==='Normal'?'Organizá las comidas según tus horarios.':day.shift==='Guardia'?'Llevá almuerzo o cena en tupper, más fruta y una colación.':'Comida principal antes de entrar, tupper durante y algo liviano al volver.',training:day.activity==='Gimnasio'?'Ubicá banana, yogur o tostadas antes; proteína con arroz o papa después.':day.activity==='Correr'?'Antes, banana o tostadas si necesitás. Después, proteína y carbohidrato.':'Seguí el menú base, sin agregar una colación de entrenamiento.'};}
