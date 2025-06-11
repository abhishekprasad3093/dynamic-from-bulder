# DynamicFormBuilder

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.11.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


# Dynamic Form Builder (Angular + NgRx)

This project is a dynamic form builder built using Angular. The goal was to make it easy for users to build custom forms through a drag-and-drop interface, preview them, and even allow others to fill them out — all without touching any code.

I’ve added role-based access, so Admins can create/edit templates while normal Users can just fill out forms. The app saves templates and submissions locally (for now), but the structure allows for easy backend integration.



# Part 2: Code Review Exercise

Issue 1: Missing Authorization Token in API Requests-
Both API calls (/user and /dashboard-items) are made without sending an Authorization token, despite the presence of getSessionToken() in ngOnInit. This violates both security practices and likely breaks compatibility with dashboard v3 APIs, which typically enforce authenticated access.

Include the session token in the HTTP headers using HttpHeaders when making requests.

Issue 2: Use of Template-Driven Forms Instead of Reactive Forms
Despite importing FormBuilder, the component is using template-driven forms. This is inconsistent with the comment // TODO: JD - Refactor to reactive form next sprint, and violates the Team Orange standard, which prefers reactive forms for all new or refactored components.

Replace the template-driven form with a proper Reactive Form setup using FormBuilder

** Hardcoded URLs – Should ideally use an envi  ronment config service.
** No Error Handling – Add error callbacks to .subscribe().
** Direct DOM/global access (window.DEBUG = this) – Should be wrapped in a proper debug service.
