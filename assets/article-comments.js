document.addEventListener('DOMContentLoaded', function () {
  const commentForm = document.querySelector('form.comment-form');

  commentForm.querySelector('button[type="submit"]').disabled = true;

  const authorField = commentForm.querySelector('#CommentForm-author');
  const emailField = commentForm.querySelector('#CommentForm-email');
  const bodyField = commentForm.querySelector('#CommentForm-body');

  let authorError = true;
  let emailError = true;
  let bodyError = true;

  const fields = [authorField, emailField, bodyField];

  fields.forEach(function (field) {
    const label = field.nextElementSibling;
    const error = label.nextElementSibling;

    error.style.display = 'none';

    field.addEventListener('focus', function () {

      setTimeout(function () {
        if (field === document.activeElement) {
          if (blankCheck(field) === false) {
            error.style.display = 'none';
          } else {
            error.style.display = 'block';
          }
        }
      }, 2000);
    });

    field.addEventListener('blur', function () {
      blankCheck(field, label, error);
    });

    field.addEventListener('change', function () {
      // AUTHOR VALIDATION
      if (field.name === 'comment[author]') {
        if (blankCheck(field) === false) {
          authorError = false;
          error.style.display = 'none';
        } else {
          authorError = true;
          error.style.display = 'block';
        }
      }

      // EMAIL VALIDATION
      if (field.name === 'comment[email]') {
        if (blankCheck(field) === false) {
          if (validateEmail(field) === true) {
            emailError = false;
            error.style.display = 'none';
          } else {
            emailError = true;
            error.style.display = 'block';
          }
        }
      }

      // COMMENT VALIDATION
      if (field.name === 'comment[body]') {
        if (blankCheck(field) === false) {
          bodyError = false;
          error.style.display = 'none';
        } else {
          bodyError = true;
          error.style.display = 'block';
        }
      }

      if (
        authorError === false &&
        emailError === false &&
        bodyError === false
      ) {
        commentForm.querySelector('button[type="submit"]').disabled = false;
      }

      if (authorError === true || emailError === true || bodyError === true) {
        commentForm.querySelector('button[type="submit"]').disabled = true;
      }
    });
  });

  function blankCheck(field) {
    if (field.value === '') {
      return true;
    } else {
      return false;
    }
  }

  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;

    if (re.test(email.value) === false) {
      return false;
    } else {
      return true;
    }
  }
});
