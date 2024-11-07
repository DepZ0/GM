// Eng

1.  [Instalation]

    1. Download this project.
    2. Open the project in your code editor (e.g., Visual Studio Code, Atom).
    3. Open terminal.
    4. Run `npm i` or `pnpm i` to install the dependencies.
       [---]

2.  [How_to_use]

    1. Open the `app.ts` file and find the function `loginToLinkedIn()`.
    2. Call the function as follows: `loginToLinkedIn(YOUR_LOGIN, YOUR_PASSWORD)`.
    3. Open terminal and run `npm start` (or `pnpm start`).

    Note: If you don’t want to see the function's process on the screen,
    find the line `const browser = await puppeteer.launch({ headless: false })`;
    and change false to true. (This line is "Line №25" in the code.)

    [---]

3.  [Result]

    After the function completes, you will see a created
    `out.log` file and a `profile_photos` folder.
    [---]

[Bypassing_reCAPTCHA]

1. Delays: Add random delays after each action to make interactions appear more natural.
2. Proxies: Using proxies for different sessions can help prevent IP blocking.
3. Simulating Real Mouse Movements: Puppeteer includes built-in methods for simulating user actions,
   which can be further customized for more realistic behavior.
   [---]

   // Ua

4. [Встановлення]

   1. Завантажте цей проєкт.
   2. Відкрийте проєкт у своєму редакторі коду (наприклад, Visual Studio Code, Atom).
   3. Відкрийте термінал.
   4. Виконайте `npm i` або `pnpm i`, щоб встановити залежності.
      [---]

5. [Як_використовувати]

   1. Відкрийте файл `app.ts` і знайдіть функцію `loginToLinkedIn()`.

   2. Викличте функцію наступним чином: `loginToLinkedIn(YOUR_LOGIN, YOUR_PASSWORD)`.

   3. Відкрийте термінал і виконайте `npm start` (або `pnpm start`).

   Примітка: Якщо ви не хочете бачити процес виконання функції на екрані,
   знайдіть рядок `const browser = await puppeteer.launch({ headless: false })`;
   і змініть false на true. (Цей рядок знаходиться на "Рядку №25" в коді.)

   [---]

6. [Результат]

   Після завершення виконання функції з'являться файл
   `out.log` та папка `profile_photos`.
   [---]

[Обхід_reCAPTCHA]

1. Затримки: Після кожної дії додавайте випадкові затримки, щоб взаємодії виглядали природнішими.
2. Проксі-сервера: Використання проксі для різних сесій може допомогти уникнути блокування IP-адрес.
3. Розпізнавання реальних рухів миші: Puppeteer має вбудовані методи для симуляції дій користувача,
   які можна додатково кастомізувати для більш реалістичної поведінки.
   [---]
