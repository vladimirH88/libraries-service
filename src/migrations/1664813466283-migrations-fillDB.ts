import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrations1664813466283 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO libraries.libraries (name, address, phone, email) VALUES
      ('Библиотека Филиал N 9', 'ул. Врублевского, Гродно', '8 0152 48-08-92', null),
      ('Библиотека Им Макаенка Центральная Городская', 'ул. Советских Пограничников 106, Гродно', '8 0152 52-05-77', null),
      ('ГУК "Гродненская обласная научная библиотека им. Е. Ф. Карского" Детский филиал', 'Советская ул. 25, Гродно', '8 0152 62-03-10', 'https://grodnolib.by/'),
      ('Библиотека Им Карского Областная Научная', 'ул. Карбышева 17, Гродно', '8 0152 71-89-46', 'https://grodnolib.by/'),
      ('Библиотека Детская Филиал Областной Библиотеки', 'ул. Советских Пограничников 51/2, Гродно 230024', '8 0152 72-37-51', 'https://centrbibl.grodno.by/index.php'),
      ('Библиотека Филиал N 12', 'ул. Лиможа 20, Гродно 230005', '8 0152 76-85-07', 'https://grodnolib.by/')
      `,
    );
    await queryRunner.query(
      `INSERT INTO libraries.genres (name, description) VALUES
      ('Авангардная литература','Характеризуется нарушением канонов и языковыми и сюжетными экспериментами. Как правило, авангард выходит очень маленькими тиражами. Тесно переплетается с интеллектуальной прозой.'),
      ('Боевик','Ориентирован преимущественно на мужскую аудиторию. Основа сюжета — драки, погони, спасение красоток и т.п.'),
      ('Детектив', 'Основная сюжетная линия — раскрытие преступления.'),
      ('Исторический роман', 'Время действия — прошлое. Сюжет, как правило, привязан к значимым историческим событиям.'),
      ('Любовный роман', 'Герои обретают любовь.'),
      ('Мистика', 'Основа сюжета — сверхъестественные события.'),
      ('Приключения', 'Герои ввязываются в авантюру и/или отправляются в рискованное путешествие.'),
      ('Триллер/ужасы', 'Героям грозит смертельная опасность, от которой они пытаются избавиться.'),
      ('Фантастика', 'Сюжет закручивается в гипотетическом будущем или в параллельном мире. Одна из разновидностей фантастики — альтернативная история.'),
      ('Фэнтези/сказки', 'Основными признаками жанра являются сказочные миры, волшебство, невиданные существа, говорящие животные и пр. Часто основывается на фольклоре.')
      `,
    );
    await queryRunner.query(
      `INSERT INTO libraries.positions (name, description) VALUES
      ('Директор', 'Раздача премии и люлей'),
      ('Библиотекарь', 'Учёт и отпуск печатной литературы.'),
      ('Главный библиотекарь', 'Работа с административными документами.'),
      ('Охранник', 'Поддержание безопасного посетителей и персонала.')
      `,
    );
    await queryRunner.query(
      `INSERT INTO libraries.employees (name, patronymic, surname, position_id, library_id) VALUES
      ('Иван', 'Иванович', 'Иванов', (SELECT id FROM libraries.positions WHERE name = 'Директор'), (SELECT id FROM libraries.libraries WHERE name = 'Библиотека Филиал N 9')),
      ('Пётр', 'Петрович', 'Петров', (SELECT id FROM libraries.positions WHERE name = 'Охранник'), (SELECT id FROM libraries.libraries WHERE name = 'Библиотека Им Макаенка Центральная Городская')),
      ('Лариса', 'Никифоровна', 'Цветкова', (SELECT id FROM libraries.positions WHERE name = 'Библиотекарь'), (SELECT id FROM libraries.libraries WHERE name = 'Библиотека Филиал N 9'))
      `,
    );
    await queryRunner.query(
      `INSERT INTO libraries.authors (name, patronymic, surname) VALUES
      ('Михаил', 'Афанасьевич', 'Булгаков'),
      ('Эрих Мария', null, 'Ремарк'),
      ('Фёдор', 'Михайлович', 'Достоевский'),
      ('Джек', null, 'Лондон'),
      ('Лев', 'Николаевич', 'Толстой'),
      ('Джейн', null, 'Остин'),
      ('Николай', 'Васильевич', 'Гоголь'),
      ('Иван', 'Сергеевич', 'Тургеньев'),
      ('Джордж', null, 'Оруэлл')
      `,
    );
    await queryRunner.query(
      `INSERT INTO libraries.users (name, patronymic, surname, library_id) VALUES
      ('Иван', 'Иванович', 'Иванов', (SELECT id FROM libraries.libraries WHERE name = 'Библиотека Филиал N 9')),
      ('Пётр', 'Петрович', 'Петров', (SELECT id FROM libraries.libraries WHERE name = 'Библиотека Им Макаенка Центральная Городская')),
      ('Сидор', 'Сидорович', 'Сидоров', (SELECT id FROM libraries.libraries WHERE name = 'Библиотека Филиал N 12')),
      ('Сергей', 'Сергеевич', 'Сергеев', (SELECT id FROM libraries.libraries WHERE name = 'Библиотека Филиал N 9'))
      `,
    );
    await queryRunner.query(
      `INSERT INTO libraries.books (name, description, isbn, library_id, genre_id, author_id) VALUES
      ('1984', 'Своеобразный антипод второй великой антиутопии XX века - "О дивный новый мир" Олдоса Хаксли.', '97850412202422', (SELECT id FROM libraries.libraries WHERE name = 'Библиотека Филиал N 9'), (SELECT id FROM libraries.genres WHERE name = 'Фантастика'), (SELECT id FROM libraries.authors WHERE surname = 'Оруэлл')),
      ('Мастер и Маргарита', 'Один из самых загадочных и удивительных романов XX века. «Мастер и Маргарита» – визитная карточка Михаила Булгакова', '1245675435356', (SELECT id FROM libraries.libraries WHERE name = 'Библиотека Им Макаенка Центральная Городская'), (SELECT id FROM libraries.genres WHERE name = 'Триллер/ужасы'), (SELECT id FROM libraries.authors WHERE surname = 'Булгаков')),
      ('Анна Каренина', 'Гениальный роман Льва Толстого, который не оставляет равнодушным никого, кто его прочел.', '1245675435356', (SELECT id FROM libraries.libraries WHERE name = 'Библиотека Им Макаенка Центральная Городская'), (SELECT id FROM libraries.genres WHERE name = 'Авангардная литература'), (SELECT id FROM libraries.authors WHERE surname = 'Булгаков'))
      `,
    );
    await queryRunner.query(
      `INSERT INTO libraries.reserved_books (user_id, book_id, reserved_from, reserved_to) VALUES
      ((SELECT id FROM libraries.users WHERE surname = 'Сидоров'), (SELECT id FROM libraries.books WHERE name = '1984'), '${new Date().toLocaleString()}', 
      '${new Date(
        new Date().setDate(new Date().getDate() + 3),
      ).toLocaleString()}'),
      ((SELECT id FROM libraries.users WHERE surname = 'Иванов'), (SELECT id FROM libraries.books WHERE name = 'Мастер и Маргарита'), '${new Date().toLocaleString()}', '${new Date(
        new Date().setDate(new Date().getDate() + 3),
      ).toLocaleString()}'),
      ((SELECT id FROM libraries.users WHERE surname = 'Сергеев'), (SELECT id FROM libraries.books WHERE name = 'Анна Каренина'), '${new Date().toLocaleString()}', '${new Date(
        new Date().setDate(new Date().getDate() + 3),
      ).toLocaleString()}')
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
