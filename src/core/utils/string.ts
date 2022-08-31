const getSlugFromString = (string: string) => {
  string = string.toLowerCase();

  string = string.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
  string = string.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
  string = string.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
  string = string.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
  string = string.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
  string = string.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
  string = string.replace(/(đ)/g, 'd');

  string = string.replace(/([^0-9a-z-\s])/g, '');

  string = string.replace(/(\s+)/g, '-');

  string = string.replace(/^-+/g, '');

  string = string.replace(/-+$/g, '');

  return string;
};

export { getSlugFromString };
