# AiodAdminPanel

An administrative dashboard for accessing public services and managing permissions for the owner's owned services.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.0.

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

# First time run

1. Install Angular CLI
   `npm install -g @angular/cli`
2. Create project
   `ng new aoid-admin-panel`
3. Create a component
   `ng generate component services-list`
4. Build the app
   `ng build`
5. For development
   `ng serve -o`
6. Dockerize the Angular App: Create a Dockerfile in the root of your project to define how the Angular app will be built and served within a Docker container:

   ```docker
    # Use an official Node.js runtime as the base image
    FROM node:18 AS build

    # Set the working directory in the container
    WORKDIR /app

    # Copy package.json and package-lock.json to the container
    COPY package*.json ./

    # Install app dependencies
    RUN npm install

    # Copy the app's source code to the container
    COPY . .

    # Build the Angular app
    RUN npm run build

    # Use a lightweight web server to serve the Angular app
    FROM nginx:alpine
    COPY --from=build /app/dist/aiod-admin-panel /usr/share/nginx/html
   ```

7. Build a docker image:
   `docker build -t aiod-admin-panel .`
8. Run the docker container:
   `docker run -d -p 8888:80 aiod-admin-panel`

# Issues and requirements to the BE API

1. Users' unique `ID`:
   a. Needed to identify the owner of a service/metadata
   b. Give access to their own service/metadata
2. Platform/instance unique `ID`:
   a. Needed to identify the where the services are stored
3. A table field with the options `local/federated`:
   a. right now I'm using the field `is_accessible_for_free`
4. A view to list all the available metadata/endpoints:
   a. At the moment I've implemented manually a list in the FE code with the endpoints:
   ```javascript
    serviceList: Service[] = [
        { value: 'case_studies', viewValue: 'Case Studies' },
        { value: 'datasets', viewValue: 'Datasets' },
        { value: 'computational_resources', viewValue: 'Computational Resources' },
        { value: 'educational_resources', viewValue: 'Educational Resources' },
        ...
    ];
   ```
