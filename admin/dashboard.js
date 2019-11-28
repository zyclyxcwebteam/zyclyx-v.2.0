let token = sessionStorage.getItem('token');


/*
LOGOUT - USER
*/

function signOut(event) {
  event.preventDefault();
  sessionStorage.removeItem("token");
  window.location = "login.html";
}

// document.getElementById("userName").textContent = sessionStorage.getItem("user");
document.getElementById("signOut-1").addEventListener("click", signOut);
document.getElementById("signOut-2").addEventListener("click", signOut);

/* 
   DASHBOARD - HOME
*/

// get total count and update dashboard cards
function getCount(path, elementID) {
  fetch(path, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      elementID.textContent = data;
    })
    .catch(function (error) {
      console.log(error);
    })
}

// get total messages Count
let messagesCountElement = document.getElementById("message-count");
let messageCountPath = 'https://agile-plateau-09650.herokuapp.com/enquirymessages/count';
getCount(messageCountPath, messagesCountElement);

// get total job openings count

let openingsCountElement = document.getElementById("openings-count");
let openingsCountPath = 'https://agile-plateau-09650.herokuapp.com/jobopenings/count';
getCount(openingsCountPath, openingsCountElement);

// get total job applications count
let applicationsCountElement = document.getElementById("applications-count");
let applicationsCountPath = "https://agile-plateau-09650.herokuapp.com/jobapplications/count";
getCount(applicationsCountPath, applicationsCountElement);

// get recent Activity

let recentMessagesElement = document.getElementById("recentMessages");
let recentJobPostsElement = document.getElementById("recentJobPosts");
let recentJobApplicationsElement = document.getElementById("recentJobApllications");

// get last 3 messages
 
let messagesHtml = '<table class="w-100 table table-striped"><thead><tr><th>Name</th><th>Phone</th><th>Email</th><th>Date</th><th>Subject</th><th>Actions</th></tr></thead><tbody>'; 
fetch('https://agile-plateau-09650.herokuapp.com/enquirymessages?_limit=3', {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    messagesHtml += data.map(function (message) {
      let date = new Date(message.updatedAt);
      return (`
              <tr>
                <td>${message.name}</td>
                <td>${message.phone}</td>
                <td>${message.email}</td>
                <td>${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}</td>
                <td>${message.subject}</td>
                <td><span><i class="fas fa-edit mr-3 text-info action-icons"></i></span>
                <span><i class="far fa-trash-alt text-danger action-icons"></i></span></td>
              </tr>  
          `);
    }).join('')
  })
  .then(function () {
    messagesHtml += `</tbody></table>`
    recentMessagesElement.innerHTML = messagesHtml;
  })
  .catch(function (error) {
    console.log(error);
  })

// get last 3 jobposts
 
let jobPostsHtml = '<table class="w-100 table table-striped"><thead><tr><th>Position</th><th>Job Type</th><th>Location</th><th>Start Date</th><th>Close Date</th><th>Actions</th></tr></thead><tbody>'; 
fetch('https://agile-plateau-09650.herokuapp.com/jobopenings?_limit=3', {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    jobPostsHtml += data.map(function (jobPost) {
      let startDate = new Date(jobPost.createdAt);
      let closeDate = new Date(jobPost.dateposted);
      return (` 
              <tr>
                <td>${jobPost.title}</td>
                <td>${jobPost.jobtype}</td>
                <td>${jobPost.location}</td>
                <td>${startDate.getDate()}-${startDate.getMonth() + 1}-${startDate.getFullYear()}</td>
                <td>${closeDate.getDate()}-${closeDate.getMonth() + 1}-${closeDate.getFullYear()}</td>
                <td><span><i class="fas fa-edit mr-3 text-info action-icons"></i></span>
                <span><i class="far fa-trash-alt text-danger action-icons"></i></span></td>
              </tr>  
      `);
    }).join('')
  })
  .then(function () {
    jobPostsHtml += `</tbody></table>`;
    recentJobPostsElement.innerHTML = jobPostsHtml;
  })
  .catch(function (error) {
    console.log(error);
  })

// get last 3 job applications
let jobApplicationHtml = '<table class="w-100 table table-striped"><thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Applied Position</th><th>Date</th><th>Action</th></tr></thead><tbody>';
fetch('https://agile-plateau-09650.herokuapp.com/jobapplications?_limit=3', {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    jobApplicationHtml += data.map(function (jobApplication) {
      let appliedDate = new Date(jobApplication.createdAt);
      return (` 
              <tr>
                <td>${jobApplication.firstname} ${jobApplication.lastname}</td>
                <td>${jobApplication.email}</td>
                <td>${jobApplication.phone}</td>
                <td>${jobApplication.position}</td>
                <td>${appliedDate.getDate()}-${appliedDate.getMonth() + 1}-${appliedDate.getFullYear()}</td>
                <td><span><i class="fas fa-edit mr-3 text-info action-icons"></i></span>
                <span><i class="far fa-trash-alt text-danger action-icons"></i></span></td>
              </tr>  
      `);
    }).join('')
  })
  .then(function () {
    jobApplicationHtml += `</tbody></table>`;
    recentJobApplicationsElement.innerHTML = jobApplicationHtml;
  })
  .catch(function (error) {
    console.log(error);
  })

/*
 
  END - DASHBOARD HOME
*/

/* 
 CONTACT MESSAGES
*/

let messagesTab = document.getElementById('messages-tab');
let messages = document.getElementById("allMessages");
let html = '';

function getAllMessages() {

  fetch("https://agile-plateau-09650.herokuapp.com/enquirymessages", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(function (response) {
      return response.json();
    })
 
    .then(function (data) {     
      html += data.map(function(message) { 
    let date = new Date(message.updatedAt);         
    return (`<div class="col-lg-5 message border p-3 m-2">
    <div class="row">
    <div class="col-12"> <h5>${message.subject}</h5></div>
    <div class="col-8"> <p class="name"><i class="fas fa-user mr-2"></i>${message.name}</p></div>
    <div class="col-4"><p class="date"><i class="far fa-calendar-alt mr-2"></i></i>${date.getUTCDate()}-${date.getMonth()+1}-${date.getFullYear()}</p></div>
    <div class="col-12"><p class="mesage">${message.message}</p> </div>
    <div class="col-8"><p class="email"><i class="fas fa-envelope mr-2"></i>${message.email}</p></div>
    <div class="col-4"> <p class="phone"><i class="fas fa-phone-alt mr-2"></i>${message.phone}</p></div>
 
    </div>                     
</div>`);
      }).join('')
    })
    .then(function () {
      messages.innerHTML += html;
    })
    .catch(function (error) {
      console.log(error);
    })
}

// load all messages on clicking messges link in side navbar
messagesTab.addEventListener('click', function () {
  getAllMessages();
})
 
$('#viewAllMessages').on('click', function (e) {
  e.preventDefault();
  $('#messages-tab').tab('show');
  getAllMessages();
})

/*
 ADMIN - GET ALL OPEN POSITIONS
*/

let openPositionsTab = document.getElementById('openings-tab');
let allOpenPositions = document.getElementById("allOpenPositions");
let positionsLoaded = false;
function getAllOpenPositions(){
  let html = `<table class="w-100  table table-striped table-hover table-borderless bordered">
  <thead>
  <tr>
  <th>Title</th>
  <th>Jobcategory</th>
  <th>Job Type</th>
  <th>Location</th>
  <th>View</th>
  <th>Action</th>
  </tr>
  </thead>
  <tbody>`;
  fetch("https://agile-plateau-09650.herokuapp.com/jobopenings", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
 
 
  .then(function(response){
    return response.json();    
  })
  .then(function(data){   
    console.log(data); 
    html += data.map(function(opening){ 
      return `<tr class="capitalize">
      <td>${opening.title}</td>
      <td>${opening.jobcategory}</td>
      <td>${opening.jobtype}</td>
      <td>${opening.location}</td>
      <td><a href="#" data-toggle="modal" data-target="#OpenModal" class="jobDetailsLink" data-id=${opening.id}>Open</a></td>    
      <td><span><i class="fas fa-edit mr-3 text-info action-icons"></i></span>
      <span><i class="far fa-trash-alt text-danger action-icons"></i></span></td>
    </tr> ` 
      }).join('');
    })
    .then(function () {
      html += `</tbody></table>`;
      allOpenPositions.innerHTML = html;
      positionsLoaded=true;
    })
}


openPositionsTab.addEventListener("click", function () {  
  getAllOpenPositions();
})

$('#viewAllOpenings').on('click', function (e) {
  e.preventDefault();
  $('#openings-tab').tab('show');
  getAllOpenPositions();
})


/*
 ADMIN - GET ALL Job Applications
*/
let jobApplicationsTab = document.getElementById('applications-tab');
let allJobApplications = document.getElementById("allJobApplications");

function getAllJobApplications(){
  let path = "https://agile-plateau-09650.herokuapp.com/jobapplications";
  let html = '';
  fetch(path, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      html += data.map(function (application) {
        return `<div class="opening border p-3 capitalize">
      <h5>${application.firstname} ${application.lastname}</h5>
      <p>${application.email}</p>
      <p>${application.phone}</p>
      <p>${application.message}</p>
      <p>Applied Post - ${application.position}</p>
      <p>${application.updatedAt}</p>       
      </div>`
      }).join('');
    })
    .then(function () {
      allJobApplications.innerHTML = html;
    })
}
jobApplicationsTab.addEventListener("click", function () {
  getAllJobApplications();
})

$('#viewAllApplications').on('click', function (e) {
  e.preventDefault();
  $('#applications-tab').tab('show');
  getAllJobApplications();
})
/*
    ADMIN - POST A NEW JOB
*/

// get job types and  categories for form drop down
let jobTypeElement = document.getElementById("jobType");
let jobTypePath = "https://agile-plateau-09650.herokuapp.com/jobtypes";

let jobCategoryElement = document.getElementById("jobCategory");
let jobCategoryPath = "https://agile-plateau-09650.herokuapp.com/jobcategories";

// get Job details from API - (job types, job categories)
function getJobDetails(path, selectElement) {
  fetch(path, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      selectElement.options.length = 0;
      data.map(function (item) {
        selectElement.options.add(new Option(item.title, item.title));
      })
    })
    .catch(function (error) {
      console.log(error);
    })
}

// get job categories
getJobDetails(jobCategoryPath, jobCategoryElement);

// get job types
getJobDetails(jobTypePath, jobTypeElement);

// Add new job type 
let saveJobTypeButton = document.getElementById("saveJobType");

saveJobTypeButton.addEventListener('click', function (e) {
  e.preventDefault();
  let addJobTypeForm = document.getElementById("addJobType");
  let jobTypeFormData = new FormData(addJobTypeForm);
  // job type data in JSON format
  data = {
    title: jobTypeFormData.get("jobtype"),
  }

  // validate form and submit data to API
  if (addJobTypeForm.checkValidity()) {
    fetch("https://agile-plateau-09650.herokuapp.com/jobtypes", {
      method: 'post',
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data)
    })

      .then(function (response) {
        getJobDetails(jobTypePath, jobTypeElement);
      })
      .then(function () {
        $('#jobTypeModal').modal('hide')
      })
      .catch(function (error) {
        console.log(error);
      })
  }
})

// Add new job Category

let saveJobCategoryButton = document.getElementById("saveJobCategory");

saveJobCategoryButton.addEventListener('click', function (e) {
  e.preventDefault();
  let addJobCategoryForm = document.getElementById("addJobCategory");
  let jobCategoryFormData = new FormData(addJobCategoryForm);
  // job type data in JSON format
  data = {
    title: jobCategoryFormData.get("jobcategory"),
  }

  // validate form and submit data to API
  if (addJobCategoryForm.checkValidity()) {
    fetch("https://agile-plateau-09650.herokuapp.com/jobcategories", {
      method: 'post',
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data)
    })
      .then(function (response) {
        document.querySelector(".modal-body").innerHTML = "<h5 class='text-success'>Added Successfully</h5>";
        getJobDetails(jobCategoryPath, jobCategoryElement);
      })
      .then(function () {
        $('#jobCategoryModal').modal('hide')
      })
      .catch(function (error) {
        console.log(error);
      })
  }
})

// submit post job form data to API

let postJobForm = document.getElementById("postJob");

postJobForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let postJobFormData = new FormData(postJobForm);
  let title = postJobFormData.get("title");
  let description = postJobFormData.get("description");
  let location = postJobFormData.get('location');
  let closeDate = postJobFormData.get('closedate');
  let jobType = postJobFormData.get("jobtype");
  let jobCategory = postJobFormData.get('jobcategory');

  let qualification1 = postJobFormData.get('qualification1');
  let qualification2 = postJobFormData.get('qualification2');
  let qualification3 = postJobFormData.get('qualification3');

  let requirement1 = postJobFormData.get('requirement1');
  let requirement2 = postJobFormData.get('requirement2');
  let requirement3 = postJobFormData.get('requirement3');

  let data = {
    title: title,
    description: description,
    location: location,
    jobtype: jobType,
    jobcategory: jobCategory,
    dateposted: closeDate,
    qualifications: { one: qualification1, two: qualification2, three: qualification3 },
    requirements: { one: requirement1, two: requirement2, three: requirement3 }
  }
  console.log('Posting a New Job', JSON.stringify(data));
  fetch("https://agile-plateau-09650.herokuapp.com/jobopenings", {
    method: 'post',
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data)
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    })
    .catch(function (error) {
      console.log(error);
    })

})


// Job opening details

// $('#OpenModal').on('show.bs.modal', function (e) {
//   // do something...
//   console.log(e);
// })

// $(function() {
//   $('#jobDetailsLink').click(function(e){
//     console.log(e);
//   })
//   $('#OpenModal').click(function(e) {
//     $('#myModal').modal('show');
     
//   });
// });

$(document).on("click", ".jobDetailsLink", function () {
  let jobOpeningId = $(this).data('id');
 
  //  get full details of single job opening
   fetch(`https://agile-plateau-09650.herokuapp.com/jobopenings/${jobOpeningId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(function(response){
    return response.json();    
  })
  .then(function(data){
    let title = document.getElementById('title');
    let jobMetaData = document.getElementById('jobMetaData');
    let jobDescription = document.getElementById('jobDescription');

    let months =  ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    console.log(data);
    let date1 = new Date(data.createdAt);
let startDateString = `${date1.getDate()} ${months[date1.getMonth()]} ${date1.getFullYear()}`;
// let date2 = new Date(data.dateposted);

let date2 = new Date(data.lastdate);
let closeDateString = `${date2.getDate()} ${months[date2.getMonth()]} ${date2.getFullYear()}`;

title.textContent = data.title;
jobMetaData.innerHTML = `<div class="d-flex justify-content-start metaData">
      <p><i class="fas fa-map-marker-alt"></i>${data.location}</p>
      <p><i class="fas fa-user-tie"></i>${data.jobtype}</p>
      <p><i class="far fa-calendar-alt"></i>${startDateString}</p>
      <p><i class="far fa-calendar-minus"></i>${closeDateString}</p>       
    </div>`

    jobDescription.textContent = data.description

// job responsibilities
let responsibilitiesElement = document.getElementById('responsibilities');
let responsibilitiesHtml = '';
    
if(data.responsibilities){
      for(let item in data.responsibilities){
        responsibilitiesHtml +=`<li class="d-flex">
        <span><i class="fa fa-check rounded-circle p-1 text-primary mr-2"></i></span>
        <p>${data.responsibilities[item]}</p>
        </li>`
      }
    }
    responsibilitiesElement.innerHTML = responsibilitiesHtml;

//  job requirements

    
// job responsibilities
let requirementsElement = document.getElementById('requirements');
let requirementsHtml = '';
    
if(data.requirements){
      for(let item in data.requirements){
        requirementsHtml +=`<li class="d-flex">
        <span><i class="fa fa-check rounded-circle p-1 text-primary mr-2"></i></span>
        <p>${data.requirements[item]}</p>
        </li>`
      }
    }
    requirementsElement.innerHTML = requirementsHtml;
  })
});