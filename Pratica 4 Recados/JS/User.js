const formUser = document.getElementById('form-sign-up');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const formControl = document.getElementById('form-control');

formUser.addEventListener('submit', (event) => {
  event.preventDefault();

  const usernameValue = usernameInput.value.trim();
  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();

  if (usernameValue === '' || emailValue === '' || passwordValue === '') {
    formControl.classList.add('form-control.error')
    alert('Por favor preencha todos os campos.');
    return;
  } else {
    formControl.classList.remove('form-control.error')
    formControl.classList.add('form-control.success')
    alert('Cadastro realizado com sucesso!');
  }

  const storedUsersJSON = localStorage.getItem('Usuários');
  const users = storedUsersJSON ? JSON.parse(storedUsersJSON) : [];

  const newUser = {
    name: usernameValue,
    avatar: "",
    password: passwordValue,
    login: emailValue,
  };

  users.push(newUser);

  localStorage.setItem('Usuários', JSON.stringify(users));

  createNewUser(newUser)

});

async function createNewUser(user) {
  try {
    const response = await api.post('/users', user);

    if (response.status === 201) {
      alert('Usuário cadastrado com sucesso!')

      usernameInput.value = ""
      emailInput.value = ""
      passwordInput.value = ""

      location.href = "cadastrar-usuario.html"
    };
  } catch (error) {
    console.log('Erro ao cadastrar usuário', error);
  }
};