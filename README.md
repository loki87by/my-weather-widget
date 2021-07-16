# **My Weather Widget**
### Мой первый виджет и в то же время первая работа на React с использованием TypeScript
В проекте из ранее неиспользуемых технологий имеются Drag&Drop и геолокация.
В проекте реализовано следующее:
 - При первой загрузке выводится информация о погоде для населенного пункта в котором находится пользователь
 - В настройках можно добавить/удалить населенный пункт, а так же поменять их местами
 - Так же можно изменить язык с английского(по дефолту) на русский
 - Реализована пагинация: по умолчанию на основной странице виджета не более 3х элементов, а на странице настроек не более 7.
#### Данные о погоде берутся с ресурса: [api.openweathermap.org](api.openweathermap.org) и ограничены 60 запросами в минуту.
## Для Вставки виджета на вашу страницу используйте код:
```html
<weather-widget />
<script src="https://myweatherwidget.netlify.app/main.82b01c8ddb85e77eaaf3.js"></script>
<script>
  window.addEventListener("DOMContentLoaded", function(event) {
    const widget = document.querySelector('weather-widget')
    console.log(widget)
    MyApp.init(widget); 
  });
</script>
```