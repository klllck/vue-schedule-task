# Vue3 Schedule Task

### Приложение для составления и управления расписанием (Vue3 + Pinia)
## https://schedule-task-vue.netlify.app/

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
Доступны 2 типа пользователя: оператор и админ
Чтобы залогиниться, как админ, необходимо ввести пароль `admin` нажать на кнопку "Войти" (на пароль поставленна заглушка для обхода аутентификации с бэкенда)
Все данные приложения хранятся в `LocalStorage`
