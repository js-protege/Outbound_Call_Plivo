const utlity = {
  isJsonObject(str) {
    try {
        return typeof JSON.parse(str) == 'object';
    } catch (e) {
        return false;
    }
  },
  integerchk($event) {
    var regex = new RegExp(/^\d*$/);
    var key = String.fromCharCode(!$event.charCode ? $event.which : $event.charCode);
    if ((!regex.test(key) && $event.charCode !== 13 && $event.charCode !== 9) || ($event.target.value.length > 9)) {
       $event.preventDefault();
       return false;
    } else {
      return true
    }  
  }
}

export default utlity