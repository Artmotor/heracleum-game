// Массив вопросов о борщевике
const questions = [
    {
        text: "Борщевик можно безопасно вырвать голыми руками, если делать это быстро",
        isMyth: true,
        explanation: "Сок борщевика мгновенно попадает на кожу даже при кратком контакте. Ожог проявится позже под солнцем (даже через одежду!).",
        tip: "Никогда не трогайте борщевик без полной защиты: плотный костюм + резиновые перчатки + защитные очки!"
    },
    {
        text: "Сок борщевика вызывает ожоги только при попадании на него солнечного света",
        isMyth: false,
        explanation: "Фуранокумарины в соке делают кожу сверхчувствительной к УФ-лучам. Без солнца ожога не будет, но сок нужно смыть!",
        tip: "После контакта избегайте солнца 48 часов!"
    },
    {
        text: "Ожоги от сока борщевика могут появиться даже через одежду",
        isMyth: false,
        explanation: "Сок может пропитать тонкую/мокрую ткань. Особенно опасны джинсы после дождя.",
        tip: "Надевайте непромокаемую одежду при работе с борщевиком!"
    },
    {
        text: "После контакта с соком борщевика нужно промыть кожу водой с мылом и избегать солнца 2 дня",
        isMyth: false,
        explanation: "Это минимум! Тщательное промывание снижает риск, но защита от солнца обязательна.",
        tip: "Используйте мыло и много воды для промывания!"
    },
    {
        text: "Борщевик Сосновского съедобен и полезен, как его безобидные виды",
        isMyth: true,
        explanation: "Борщевик Сосновского ЯДОВИТ! Его сок вызывает тяжелые ожоги.",
        tip: "Не ешьте и не пробуйте ЛЮБОЙ борщевик без эксперта!"
    },
    {
        text: "Молодые побеги борщевика (до 20 см) безопасны",
        isMyth: true,
        explanation: "Сок опасен на ЛЮБОЙ стадии роста! Даже маленькие ростки содержат ядовитые вещества.",
        tip: "Остерегайтесь даже маленьких растений!"
    },
    {
        text: "Борщевик можно косить обычной газонокосилкой без защиты",
        isMyth: true,
        explanation: "Косилка разбрызгивает сок! Это крайне опасно.",
        tip: "Косите ТОЛЬКО в полной защите! Триммер с катушкой безопаснее."
    },
    {
        text: "Лучший способ уничтожить борщевик – полить бензином и поджечь",
        isMyth: true,
        explanation: "Это незаконно, пожароопасно и токсично! Дым содержит ядовитые вещества.",
        tip: "Используйте разрешенные методы (скашивание, гербициды спецназначения)!"
    },
    {
        text: "Ожог от борщевика похож на обычный термический ожог",
        isMyth: true,
        explanation: "Это фотохимический ожог (как от луговых трав + в разы сильнее).",
        tip: "Лечите как тяжелый ожог 2-3 степени!"
    },
    {
        text: "Если сок попал на кожу, но солнца нет – ожога не будет",
        isMyth: true,
        explanation: "Сок остается на коже. Ожог проявится позже при любом контакте с УФ-лучами.",
        tip: "Всегда промывайте кожу после ЛЮБОГО контакта!"
    },
    {
        text: "Дети более уязвимы к ожогам борщевика, чем взрослые",
        isMyth: false,
        explanation: "Их кожа нежнее, а доза сока относительно массы тела больше.",
        tip: "Учите детей узнавать борщевик и держаться подальше!"
    },
    {
        text: "Борщевик опасен только в период цветения",
        isMyth: true,
        explanation: "Опасен весь сезон (сок есть всегда). Наиболее агрессивен в жаркую солнечную погоду.",
        tip: "Будьте бдительны с мая по сентябрь!"
    },
    {
        text: "Растения с похожими белыми зонтиками (дягиль, сныть) тоже опасны",
        isMyth: true,
        explanation: "Дягиль и сныть безопасны. Борщевик Сосновского отличается огромными размерами, пятнистым стеблем и сложными зонтиками.",
        tip: "Учитесь отличать: у борщевика ОГРОМНЫЕ листья и пятна на стебле!"
    },
    {
        text: "Если тронуть БОРЩЕВИК СУХОЙ рукой, ожога не будет",
        isMyth: true,
        explanation: "Сок выделяется при малейшем повреждении растения! Даже сухой контакт опасен.",
        tip: "Не прикасайтесь НИКАК!"
    },
    {
        text: "После скашивания борщевика, его корень погибает",
        isMyth: true,
        explanation: "Корень живуч! Растение может отрасти заново.",
        tip: "Скашивайте несколько раз за сезон или уничтожайте корень специнструментом."
    },
    {
        text: "Семена борщевика могут сохраняться в почве до 5-7 лет",
        isMyth: false,
        explanation: "Отсюда его живучесть. Семена прорастают даже после длительного периода.",
        tip: "Борьба с борщевиком требует системности и времени!"
    },
    {
        text: "Борщевик можно уничтожить, засыпав его солью",
        isMyth: true,
        explanation: "Борщевик действительно погибает от соли, но это очень вредно для почвы и подземных вод. Метод запрещен в большинстве регионов.",
        tip: "Используйте гербициды, разрешенные для борщевика, строго по инструкции!"
    },
    {
        text: "Если сок попал в глаза – нужно срочно промыть их водой и бежать к врачу",
        isMyth: false,
        explanation: "Это экстренная ситуация! Промывайте глаза обильно водой и СРОЧНО к офтальмологу.",
        tip: "Не трите глаза! Это усилит поражение."
    },
    {
        text: "Пыльца борщевика может вызывать сильную аллергию и отек дыхательных путей",
        isMyth: false,
        explanation: "Особенно опасно для астматиков и аллергиков в период цветения.",
        tip: "Не заходите в заросли в июне-июле (период цветения)!"
    },
    {
        text: "Заросли борщевика снижают биоразнообразие и вредят природе",
        isMyth: false,
        explanation: "Он вытесняет местные растения, нарушая экосистему.",
        tip: "Уничтожая борщевик, вы помогаете природе!"
    },
    {
        text: "Если обжегся борщевиком, можно мазать ожог маслом или жиром",
        isMyth: true,
        explanation: "Масло закупоривает поры, усугубляя ожог. Только промывание и специальные гели.",
        tip: "Используйте Пантенол или аналоги. При тяжелых ожогах – к врачу!"
    },
    {
        text: "Скашивать борщевик эффективнее всего ДО цветения",
        isMyth: false,
        explanation: "Это не дает ему зацвести и дать семена. Лучшее время – май-июнь.",
        tip: "Повторяйте скашивание каждые 3-4 недели."
    },
    {
        text: "Борщевик можно победить, посадив на его место топинамбур или кострец",
        isMyth: false,
        explanation: "Эти растения могут его подавлять. Особенно эффективны после скашивания. Вместе с тем подавление другими растениями возможно лишь при постоянном присмотре и прополке борщевика на засеянной территории, т.к. сами растения не справляются, он постепенно забирает землю обратно, если не мешать.",
        tip: "Высаживайте их на скошенных участках для профилактики."
    },
    {
        text: "Если вы обнаружили борщевик во дворе/на детской площадке, нужно срочно сообщить в УК/администрацию/спецслужбы",
        isMyth: false,
        explanation: "Не пытайтесь бороться сами в общественных местах! Это опасно и может быть незаконно.",
        tip: "Используйте приложения ('Антиборщевик', 'Госуслуги') или звоните в МЧС."
    },
    {
        text: "Борщевик Сосновского был завезен в Россию как ценная кормовая культура",
        isMyth: false,
        explanation: "Его культивировали в середине XX века, но он 'сбежал' с полей из-за опасности для людей и животных.",
        tip: "Знание истории помогает понять масштаб проблемы."
    }
];
