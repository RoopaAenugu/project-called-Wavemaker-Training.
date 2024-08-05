let password=document.getElementById("password");
let cpassword=document.getElementById("confirmpassword");

document.addEventListener('DOMContentLoaded', function() {
   
    fetch('https://reqres.in/api/users/2')
        .then(response => response.json())
        .then(data => {
            const user = data.data; 
            console.log(user);
            document.getElementById('fname').value = user.first_name;
            document.getElementById('lname').value = user.last_name;
            document.getElementById('email').value = user.email;
            document.getElementById('source').value = 'Intern'; 
            document.getElementById('income').value = 18000;
            document.getElementById('incomeValue').textContent = '18k'; 

            if (user.gender === 'female') {
                document.getElementById('female').checked = true;
            } else if (user.gender === 'male') {
                document.getElementById('male').checked = true;
            }

            const hobbies = ['music', 'sports', 'travel', 'movies']; 
            hobbies.forEach(hobby => {
                const checkbox = document.getElementById(hobby);
                if (checkbox) {
                    checkbox.checked = true; 
                }
            });
        });

            document.getElementById('createAccountForm').addEventListener('submit', function(event) {
            event.preventDefault(); 
                
                const formData = new FormData(this);
                const data = Object.fromEntries(formData);
                console.log(data);
                if(password.value!=cpassword.value){
                    alert("password not matching");
                    return;
                }
             
               fetch('https://reqres.in/api/users/2', {

                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                })
               
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    alert('Form submitted successfully!');
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Form submission failed.');
                });
            })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    document.getElementById('income').addEventListener('input', function() {
     document.getElementById('incomeValue').textContent = `${this.value / 1000}k`;
    });
});
