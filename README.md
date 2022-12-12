# Vue3 Schedule Task

### Приложение для составления и управления расписанием (Vue3 + Pinia + Vite)
## https://schedule-task-vue.netlify.app

## Настройка сборки проекта
```bash
# install dependencies
$ yarn install

# serve with hot reload at path localhost:5173
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start
```
## Пояснения к проекту
Чтобы залогиниться, как админ, необходимо ввести пароль `admin` в соответствующее поле и нажать на кнопку `ВОЙТИ` (на пароль поставлена заглушка для обхода аутентификации с бэкенда).

Админ может создавать новые слоты (кнопка `ДОБАВИТЬ СЛОТ`), удалять их и изменять.

Если слотов нет, то при добавлении нового создается новое расписание (указанный при создании день недели и сам слот).

Админ также может удалять слоты и дни в в расписании (если на расписании дня будет удален последний доступный слот, это расписание также удалится).

Также можно изменять слоты и менять их местами (через drag’n’drop)

Все данные приложения хранятся в `LocalStorage`

P.S. Верстка не адаптивная (сделана под десктоп)
