# angularjs_part2_frontcamp

## Notes:
- inside of */server/config* should be *'db.js'* file with contents similar to the below one
    ```
    module.exports = {
        url : 'mongodb://<user name>:<user password>@ds217138.mlab.com:17138/node_js_frontcamp'
    };
    ```
- logs write to *'/app/access.log'* file (morgan logger is in use)

---
---

## Task is to create the admin panel using latest AngularJS:

1. ~~Add AngularJS 1.6.1 to a project~~
2. ~~Add minimum functionality~~
    1. ~~Create a component for displaying amount of articles and list of their titles~~
    2. ~~Create a form (using native directives) to add an article~~
3. Add more functionality
    1. ~~Add validation to the form~~
        1. ~~Fields "Title" and "Content" should be mandatory~~
        2. ~~Create a custom validator that check the minimum length of an article 20 symbols (optional).~~
    2. ~~Reuse the form above to edit an article by clicking on article title.~~
        1. ~~Hint: you may probably need to pass an action to the button using "&"~~
    3. ~~Create a component-button "Add an article" and open appropriate form on click~~
4. ~~Add routes and resource~~
    1. ~~"Add article"/"Edit article" forms should be opened inside different views.~~
    2. ~~Make sure that "Add article"/"Edit article" views have different routes, i.e.~~
        1. ~~/admin/article/<articleId>/edit~~
        2. ~~/admin/article/add~~
    3. Use Resource to make requests to a server.
5. To have more experience *
    1. ~~Create pagination component and use it to display a list of articles~~
    2. List of numbers for pagination buttons on should be generated using custom Filter
* Making  #5 without part (b) can be also considered as "excellent"
---
