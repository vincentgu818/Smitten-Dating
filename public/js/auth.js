const auth = angular.module("SmittenApp");

auth.controller("AuthController", [
   "$http",
   function($http) {
      this.edit = false;

      this.createUser = () => {
         $http({
            method: "POST",
            url: "/users",
            data: {
               username: this.newUsername,
               password: this.newPassword
            }
         }).then(
            response => {
               console.log(response);
               this.newUsername = "";
               this.newPassword = "";
            },
            error => {
               console.error(error);
            }
         );
      };

      this.logIn = () => {
         $http({
            method: "POST",
            url: "/sessions",
            data: {
               username: this.username,
               password: this.password
            }
         }).then(
            response => {
               this.currentUser = response.data;
               this.username = "";
               this.password = "";
               console.log(this.currentUser);
            },
            error => {
               console.error(error);
            }
         );
      };

      this.logOut = () => {
         $http({
            method: "DELETE",
            url: "/sessions"
         }).then(
            response => {
               this.currentUser = undefined;
            },
            error => {
               console.error(error);
            }
         );
      };

      this.checkUser = () => {
         $http({
            method: "GET",
            url: "/sessions"
         }).then(
            response => {
               this.currentUser = response.data;
            },
            error => {
               console.error(error);
            }
         );
      };

      this.changeEdit = () => {
         this.edit === false ? (this.edit = true) : (this.edit = false);
      };

      this.updateProfile = () => {
         const inputData = {
            imgURL:
               this.imgURL ||
               "https://archive-media-1.nyafuu.org/bant/image/1532/44/1532446326266.png",
            info: {
               age: this.age || 100,
               name: this.name || "James Bond",
               height: this.height || "10'1",
               location: this.location || "Alaska",
               bio: this.bio || "Hello, the name is Bond, James Bond!"
            }
         };
         console.log(inputData);

         $http({
            method: "PUT",
            url: `/users/${this.currentUser._id}`,
            data: inputData
         }).then(
            response => {
               this.currentUser = response.data;
               console.log(response);
               this.changeEdit();
               // this.currentUser = response.data;
            },
            error => {
               console.error(error);
            }
         );
      };
   }
]);