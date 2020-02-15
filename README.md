# subscription-maker-admin
Projekat na ovom repozitorijumu predstavlja admin deo nase aplikacije, koji se koristi za zaposljenje sa privilegijom admin i staff. 
Sam administratorski deo sluzi za unos novih paketa i brisanje postojecih. Admin je lice sa posebnim ovlascenjem, ne postoji nikakv tip registracije jer se ovlascenja dobijaju od strane nadleznih koji admin podatke (rollID, email i password) direktno unose u bazu i daju adminu na koriscenje.
Sam radnicki (staff) deo sluzi za unos novih korisnika u bazu, sklapanje novih ugovora i brisanje postojecih. Radnik je lice sa posebnim ovlascenjem, ne postoji nikakv tip registracije jer se ovlascenja dobijaju od strane nadleznih koji staff podatke (rollID, email i password) direktno unose u bazu i daju radniku na koriscenje.
LoginPage.js fajl predstavlja stranicu na kojoj je moguce uneti dobijeni email i password. U slucaju uspesnog logovanja admin biva prosledjen na adminDashboard, a staff na employeeDashboard. Ukoliko je pri logovanju pogresio sifru, backend vraca gresku 422 i o tome obavestava alert-om. Ukoliko je pri logovanju pogresen email ili zapravo takav ne postoji, backend vraca gresku 404 i o tome obavestava alert-om.
U slucaju korektnog logovanja, admin je prosledjen na adminDashboard. Na dashboardu se nalaze 2 forme, za unos novih paketa, za brisanje postojecih paketa. Ove forme nalaze se u CreateWizard.js i DisplayPlans.js fajlovima. 
U slucaju korektnog logovanja, satff je prosledjen na employeeDashboard. Na dashboardu se nalazi bar za pretrazivanje korisnika, ako korisnik ne postoji otvara se forma za kreiranje profila korisnika, ako korisnik postoji vrsi se prikaz postojecih ugovora i mogucnost za njihovo uklanjanje i dodavanje novih ugovora. Ovo je napisano u EmployeeDashboard.js fajlu.
Funkcije za logovanje rade sa AuthService.js fajlom, a funkcije za izmenu baze sa SubscriptionService.js fajlom. Oba service fajla nalaze se u folderu services. Koriscenjem axios.get i axios.post metoda, vrsi se komunikacija sa backednom.

Admin aplikacija se pokrece na http://localhost:3000.




This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
