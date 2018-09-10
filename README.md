# Shared Tools

This module is meant to allow **Sharing Code** among our multiple apps (single spot to maintain, less duplicate code, faster delivery)

- Flitdesk
- Backoffice
- Visitor

The current module structure is the following: 


`SharedTools` module expects some **Application Classes** to be declared in a specific spot:
- `src/app/app.constants.ts`
- `src/providers/remote-service.ts`
- `src/providers/app-preferences.service.ts`
