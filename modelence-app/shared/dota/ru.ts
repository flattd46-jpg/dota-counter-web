/**
 * Russian localisation layer.
 *
 * The English `name` stays the primary key everywhere (counter tables, the
 * engine, the `drafts` Store) — this file only maps that key onto display text.
 * Never key data off the Russian name.
 */

/** `EnglishName|РусскоеИмя` */
const HERO_RU = `
Abaddon|Абаддон
Alchemist|Алхимик
Ancient Apparition|Дух Древних
Anti-Mage|Антимаг
Arc Warden|Арк Варден
Axe|Акс
Bane|Бэйн
Batrider|Батрайдер
Beastmaster|Повелитель Зверей
Bloodseeker|Кровосек
Bounty Hunter|Охотник за головами
Brewmaster|Брюмастер
Bristleback|Бристлбэк
Broodmother|Бруда
Centaur Warrunner|Кентавр
Chaos Knight|Рыцарь Хаоса
Chen|Чен
Clinkz|Клинкз
Clockwork|Клокверк
Crystal Maiden|Кристальная Дева
Dark Seer|Тёмный Провидец
Dark Willow|Тёмная Ива
Dawnbreaker|Давнбрейкер
Dazzle|Даззл
Death Prophet|Пророчица Смерти
Disruptor|Диструптор
Doom|Дум
Dragon Knight|Драконий Рыцарь
Drow Ranger|Дроу Рейнджер
Earth Spirit|Дух Земли
Earthshaker|Эртшейкер
Elder Titan|Древний Титан
Ember Spirit|Дух Огня
Enchantress|Чародейка
Enigma|Энигма
Faceless Void|Фейслесс Войд
Grimstroke|Гримстроук
Gyrocopter|Гирокоптер
Hoodwink|Худвинк
Huskar|Хускар
Invoker|Инвокер
Io|Ио
Jakiro|Джакиро
Juggernaut|Джаггернаут
Keeper of the Light|Хранитель Света
Kez|Кез
Kunkka|Кунка
Largo|Ларго
Legion Commander|Легион Командер
Leshrac|Лешрак
Lich|Лич
Lifestealer|Лайфстилер
Lina|Лина
Lion|Лион
Lone Druid|Одинокий Друид
Luna|Луна
Lycan|Ликан
Magnus|Магнус
Marci|Марси
Mars|Марс
Medusa|Медуза
Meepo|Мипо
Mirana|Мирана
Monkey King|Царь Обезьян
Morphling|Морфлинг
Muerta|Муэрта
Naga Siren|Нага Сирена
Nature's Prophet|Пророк Природы
Necrophos|Некрофос
Night Stalker|Ночной Охотник
Nyx Assassin|Никс Ассасин
Ogre Magi|Огр Маги
Omniknight|Омникнайт
Oracle|Оракул
Outworld Destroyer|Аутворлд Дестроер
Pangolier|Панголир
Phantom Assassin|Фантом Ассасин
Phantom Lancer|Фантом Лансер
Phoenix|Феникс
Primal Beast|Праймал Бист
Puck|Пак
Pudge|Пудж
Pugna|Пугна
Queen of Pain|Королева Боли
Razor|Рейзор
Riki|Рики
Ringmaster|Рингмастер
Rubick|Рубик
Sand King|Песчаный Король
Shadow Demon|Теневой Демон
Shadow Fiend|Шэдоу Фиенд
Shadow Shaman|Теневой Шаман
Silencer|Сайленсер
Skywrath Mage|Скайрат Маг
Slardar|Слардар
Slark|Сларк
Snapfire|Снапфайр
Sniper|Снайпер
Spectre|Спектра
Spirit Breaker|Спирит Брейкер
Storm Spirit|Дух Грозы
Sven|Свен
Techies|Техиес
Templar Assassin|Темплар Ассасин
Terrorblade|Террорблейд
Tidehunter|Тайдхантер
Timbersaw|Тимберсо
Tinker|Тинкер
Tiny|Тини
Treant Protector|Трент Протектор
Troll Warlord|Тролль Варлорд
Tusk|Таск
Underlord|Андерлорд
Undying|Андаинг
Ursa|Урса
Vengeful Spirit|Мстительный Дух
Venomancer|Веномансер
Viper|Вайпер
Visage|Визаж
Void Spirit|Дух Пустоты
Warlock|Варлок
Weaver|Уивер
Windranger|Виндрейнджер
Winter Wyvern|Зимняя Виверна
Witch Doctor|Витч Доктор
Wraith King|Рейф Кинг
Zeus|Зевс
`;

/** `EnglishName|РусскоеНазвание|Русское описание` */
const ITEM_RU = `
Black King Bar|Чёрный королевский скипетр|Магический иммунитет отменяет заклинания, станы и каналы на 5–9 секунд.
Pipe of Insight|Трубка мудрости|Командный барьер от магии плюс аура сопротивления магии.
Glimmer Cape|Мерцающий плащ|Сопротивление магии и невидимость, чтобы спасти союзника под фокусом.
Eternal Shroud|Вечный покров|Сопротивление магии, превращающее полученный урон заклинаниями в ману.
Lotus Orb|Лотосовая сфера|Отражает нацеленные заклинания обратно в кастера и снимает дебаффы.
Linken's Sphere|Сфера Линкена|Блокирует одно нацеленное заклинание каждые 13 секунд.
Aeon Disk|Диск эпох|Стазис на низком запасе здоровья — переживает полный бурст-комбо.
Ghost Scepter|Призрачный скипетр|Эфирная форма делает вас неуязвимым для любых атак.
Blade Mail|Клинковая броня|Возвращает урон тому, кто вас фокусит.
Crimson Guard|Багровый стражник|Командный блок физического урона против быстрых атак.
Heart of Tarrasque|Сердце Тарраска|Огромный запас здоровья и регенерация, чтобы переживать бурст.
Wraith Pact|Договор с призраком|Аура снижения урона для всей команды в бою.
Pavise|Павеза|Барьер, впитывающий урон по хрупкому союзнику.
Guardian Greaves|Наручи стража|Командное лечение и снятие дебаффов прямо в бою.
Holy Locket|Святой медальон|Усиливает всё лечение и даёт мгновенный хил.
Sange and Yasha|Санж и Яша|Сопротивление эффектам сокращает длительность станов на вас.
Kaya and Sange|Кайя и Санж|Усиление заклинаний плюс сопротивление эффектам для кастеров.
Yasha and Kaya|Яша и Кайя|Скорость, усиление заклинаний и сопротивление эффектам.
Assault Cuirass|Кираса натиска|Аура брони и скорости атаки для всей команды.
Shiva's Guard|Защита Шивы|Броня, аура замедления атаки и снижение лечения.
Vladmir's Offering|Подношение Владмира|Аура вампиризма, брони и сопротивления магии.
Heaven's Halberd|Небесная алебарда|Обезоруживает автоатакующего героя до 5 секунд.
Monkey King Bar|Посох Царя обезьян|Точные удары и доп. урон против уклонения.
Revenant's Brooch|Брошь ревенанта|Атаки наносят магический урон — игнорируют уклонение и броню.
Silver Edge|Серебряный клинок|Слом отключает пассивные способности при ударе.
Nullifier|Нуллификатор|Снимает баффы, блокирует предметы и сильно замедляет.
Diffusal Blade|Рассеивающий клинок|Сжигание маны плюс надёжное замедление одной цели.
Disperser|Диспергатор|Снимает баффы и замедляет даже через сопротивление эффектам.
Orchid Malevolence|Злобная орхидея|Молчание, запирающее мобильных кастеров.
Bloodthorn|Кровавый шип|Молчание, точные удары и усиление критов.
Scythe of Vyse|Коса Вайса|Хекс — самый надёжный контроль в игре.
Abyssal Blade|Клинок бездны|Оглушение сквозь BKB, чтобы поймать скользкого кора.
Skull Basher|Костолом|Шанс оглушения даёт ближнему бою настоящий контроль.
Rod of Atos|Жезл Атоса|Дальний корень для отлова героев с побегом.
Gleipnir|Глейпнир|Массовый корень плюс цепная молния против иллюзий.
Eul's Scepter of Divinity|Божественный скипетр Эула|Циклон для снятия дебаффов, сетапа и прерывания каналов.
Wind Waker|Ветрокрут|Циклон-спасение: снимает дебаффы и переставляет союзников.
Harpoon|Гарпун|Притягивает вас к убегающему мобильному герою.
Hurricane Pike|Ураганная пика|Отталкивает ближников от вас и добавляет дальность.
Force Staff|Посох силы|Мгновенное перемещение против инициаторов и комбо.
Blink Dagger|Кинжал перемещения|Мгновенный прыжок в тыл к кастерам.
Overwhelming Blink|Подавляющий кинжал|Прыжок с массовым замедлением, больно бьёт по иллюзиям.
Spirit Vessel|Сосуд духа|Урезает лечение и регенерацию цели вдвое.
Eye of Skadi|Око Скади|Замедление, снижение лечения и огромные характеристики.
Satanic|Сатаник|Нечестивый вампиризм, чтобы перестоять автоатакующих.
Butterfly|Бабочка|Уклонение и скорость атаки против физических коров.
Mjollnir|Мьёльнир|Статический заряд наказывает иллюзии и ближников.
Battle Fury|Ярость битвы|Рассекающий удар шинкует иллюзии и призванных существ.
Radiance|Сияние|Урон от горения плавит иллюзии, призывы и пушеров.
Maelstrom|Мальстрём|Цепная молния быстро чистит армии иллюзий.
Crystalys|Кристалис|Дешёвый крит, чтобы наказывать хрупких коров на раннем этапе.
Daedalus|Дедал|Критический урон, чтобы пробивать толстые составы.
Desolator|Опустошитель|Минус к броне, чтобы пробить живучих героев.
Medallion of Courage|Медальон отваги|Снижение брони, открывающее ранние убийства.
Solar Crest|Солнечный герб|Перенос брони плюс уклонение для дуэлей.
Veil of Discord|Пелена раздора|Усиление магического урона для составов на заклинаниях.
Ethereal Blade|Эфирный клинок|Эфирная цель получает усиленный магический урон.
Dagon|Дагон|Мгновенный бурст, чтобы удалить хрупкого саппорта.
Bloodstone|Кровавый камень|Вампиризм от заклинаний для магических коров.
Meteor Hammer|Метеоритный молот|Массовый стан с каналом для пушей и сетапа.
Refresher Orb|Сфера обновления|Сбрасывает ульты для второго круга контроля.
Octarine Core|Октариновое ядро|Снижение перезарядки и вампиризм от заклинаний.
Aether Lens|Эфирная линза|Дальность каста, чтобы не заходить в бой самому.
Aghanim's Scepter|Скипетр Агханима|Улучшение ульты — часто прямой инструмент контрплея.
Aghanim's Shard|Осколок Агханима|Улучшение под конкретного героя, многие — чистая контрплея.
Boots of Bearing|Ботинки предводителя|Командный рывок скорости и скорости атаки в бою.
Town Portal Scroll|Свиток телепортации|Настоящий ответ на сплитпуш и дайв под вышку.
Manta Style|Манта|Снимает молчание, корни и большинство дебаффов при использовании.
Dust of Appearance|Пыль прозрения|Обнаруживает невидимых героев в большом радиусе.
Gem of True Sight|Камень истинного зрения|Постоянное истинное зрение для охоты на невидимок.
Sentry Ward|Сигнальный вард|Дешёвое истинное зрение против невидимости и вардов.
Smoke of Deceit|Дымовая завеса|Двигайтесь незаметно, чтобы наказать жадных сплитпушеров.
Observer Ward|Наблюдательный вард|Обзор, чтобы уходить от ганков и читать ротации.
`;

function parsePairs(raw: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const line of raw.trim().split('\n')) {
    const [en, ru] = line.split('|');
    if (en && ru) out[en.trim()] = ru.trim();
  }
  return out;
}

export const heroNameRu: Record<string, string> = parsePairs(HERO_RU);

export const itemDescRu: Record<string, string> = {};
for (const line of ITEM_RU.trim().split('\n')) {
  const [en, , desc] = line.split('|');
  if (!en || !desc) continue;
  itemDescRu[en.trim()] = desc.trim();
}

/** Russian item description; the caller passes the English one as a fallback. */
export function itemDescriptionRu(name: string, fallback: string): string {
  return itemDescRu[name] ?? fallback;
}

/**
 * Lowercased haystack for search: Russian name + English name.
 * Lets players type either "пудж" or "pudge".
 */
export function searchHaystack(name: string): string {
  return `${heroNameRu[name] ?? name} ${name}`.toLowerCase();
}

