# Shared Tools

This module is meant to allow **Sharing Code** among our multiple apps (single spot to maintain, less duplicate code, faster delivery)

- `Flitdesk`
- `Backoffice`
- `Visitor`

The current module structure is the following: 

<img width="245" alt="screen shot 2018-09-10 at 15 26 13" src="https://user-images.githubusercontent.com/11927970/45300572-08b4be80-b50f-11e8-8647-d6550361af6b.png">

`SharedTools` module expects some **Application Classes** to be declared in a specific spot:
- `src/app/app.constants.ts`
- `src/providers/remote-service.ts`
- `src/providers/app-preferences.service.ts`
