# miNOTES 🗒️🌐

This is a notes app built on React as I got familiar with it and the features of function components and hooks. It's fully functional and the backend is provided by Firebase.

### Link
https://minote-cf0e1.web.app

### Built with

| Tool  | Used to |
| ------------- | ------------- |
| ReactJS  | Building the app with reusable components  |
| React Router DOM v5 | Provide routing scheme to navigate through reactive components and protect private routes from unauthorized users |
| SweetAlert2 | Manage modals to give information and feedback to the user  |
| Firebase | Managing the user registration and authentification. Storing, editing and retrieving notes from database |

### Functionalities

- Register and log in via email+password, or authenticating through Google. 
- Writing notes and keeping them stored remotely.
- Adding and removing a copy of a note to the favourites section.
- Editing and deleting an existing note.
- Using shortcuts to navegate the app.

### Styling 

I used plain CSS and kept a minimalistic approach in the design of the app. The class names are written following BEM convention.

### Shortcuts
| Keypress | Action |
| ------------- | ------------- |
| Shift + F  | Go to/return from the favourites section. |
| Shift + N| Navigate to 'New Note' component. |
| Shift +  A | (in 'New Note') Save note. |
| Shift + Backspace | (in 'New Note') Return to home. |

### Offline version
If the Firebase daily quota is excedeed, the app counts with an offline version that runs on localStorage. It's linked at the bottom of the login components, wich is accesible to unathourized users.




