
/**
* Validate password - min charac 8 number numeric with special key and number
* @param password - Password as string
*/
export const validatePassword = (password) => {
   let validatePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
   return validatePassword.test(password);
}

/**
 * 
 * @param {email} email 
 */
export const emailValidation = (email) => {
   let emailRegex = /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/
   return emailRegex.test(email);
}

/**
  * @param fileName - file Name
  * @onlyImage = true to upload only single image else false
  */
export const checkExtension = (file) => {
   let valid = true;
   let arr = file.name.split('.');
   let ext = arr[arr.length - 1];
   var allowedExtensions = ['PNG', 'SVG', 'JPG'];
   if (allowedExtensions.indexOf(ext.toUpperCase()) === -1) {
      valid = false;
   }
   return valid;
}


// Generate years

export const years = () => {
   var currentYear = new Date().getFullYear();
   var years:any =  [];
   var startYear = 1901;
   for (var i = startYear; i <= currentYear; i++) {
      years.push(startYear++);
   }
   return years;
}