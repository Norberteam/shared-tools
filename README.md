# Shared Tools

This module is meant to allow **Sharing Code**
- single spot to maintain
- less duplicate code
- faster delivery

among our multiple apps:
- `Flitdesk`
- `Backoffice`
- `Visitor`

The current module structure is the following: 

<img width="245" alt="screen shot 2018-09-10 at 15 26 13" src="https://user-images.githubusercontent.com/11927970/45300572-08b4be80-b50f-11e8-8647-d6550361af6b.png">

`SharedTools` module expects some **Application Classes** to be declared in a specific spot:
- `src/app/app.constants.ts`
- `src/providers/remote-service.ts`
- `src/providers/app-preferences.service.ts`

## How does it work
This `repository` is included in each one of our Application projects (only `BO` & `Visitor` app for the moment, `Flitdesk` needing to be refactored).

The main point here is **Sharing Code**: since our apps provide some **common** functionalities: 
- showing toast messages
- login
- saving to local storage
- ...

The code for achieving what is **shared** should not be **repeated** / **duplicated** across several apps. This also implies that updates to **this** module will affect all our applications, so we'll need paying an extra attention, in order to enjoy all the `pros` and avoid regressions in one of the apps
