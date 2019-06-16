import { authHeader } from '../_helpers';
import {APP_URLS}  from '../_constants/application.url';
export const userService = {
    login,
    logout,
   //  register,
    loginOtp,
    profile,
    addDocumnet,
    // getAllDoc,
    //jobpost,
   // getAlljobpost,
    //getJobInstantViews,
    Instantjobpost,
    textJDUpdate,
    ProfiletextResumeUpdate,
    viewAllApplication,
    updateJobAppsStatusById,
    getProfile,
    ProfileVideoResumeUpdate,
    ProfileUpdate



};
function loginOtp(email) {
    let url = APP_URLS.generateOTP
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    };

    return fetch(url, requestOptions)
        .then(handleResponse)
        // console.log(handleResponse);http://ec2-18-191-154-59.us-east-2.compute.amazonaws.com/gigx/api/generateOTP'
        .then(user => {
            // login successful if there's a jwt token in the response
            // if (user.token) {

            //     localStorage.setItem('user', JSON.stringify(user));
            // }

            return user;
        });
}
function login(email, login_Otp) {
    let url = APP_URLS.login
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, login_Otp })
    };

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.data.token) {
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    localStorage.clear();
}

function profile(user) {
    let url = APP_URLS.addProfile
    const requestOptions = {
        method: 'POST',
        headers: {
            Authorization: JSON.parse(localStorage.getItem('user')).data.token
        },
        body: user
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function getProfile() {
    // let url = "http://localhost:5000/gigx/api/getProfile"
    let url = APP_URLS.getProfile
    const requestOptions = {
        method: 'GET',
        headers: {
            Authorization: JSON.parse(localStorage.getItem('user')).data.token
        },
    };

    return fetch(url, requestOptions).then(handleResponse);
}


// ApplicaentProfileTextJD Update call
function ProfiletextResumeUpdate(updateTextResume) {
    //let url = "http://ec2-18-191-154-59.us-east-2.compute.amazonaws.com/gigx/api/addJobPost"
    let url = APP_URLS.updateTextResume
    const requestOptions = {
        method: 'POST',
        headers: {
            Authorization: JSON.parse(localStorage.getItem('user')).data.token,
        },
        body: updateTextResume
    };
    return fetch(url, requestOptions).then(handleResponse);
}

// ApplicaentProfileVideoJD Update call
function ProfileVideoResumeUpdate(updateVideoResume) {
    //let url = "http://ec2-18-191-154-59.us-east-2.compute.amazonaws.com/gigx/api/addJobPost"
    // let url = "http://localhost:5000/gigx/api/updateVideoResume"
    let url=APP_URLS.updateVideoResume
    const requestOptions = {
        method: 'POST',
        headers: {
            Authorization: JSON.parse(localStorage.getItem('user')).data.token,
        },
        body: updateVideoResume
    };
    return fetch(url, requestOptions).then(handleResponse);
}
// ApplicaentProfile Update call
function ProfileUpdate(updateProfile) {
    console.log(updateProfile);
    for(let x in updateProfile){
        console.log(updateProfile[x]);
    }
    //let url = "http://ec2-18-191-154-59.us-east-2.compute.amazonaws.com/gigx/api/addJobPost"
    // let url = "http://localhost:5000/gigx/api/updateProfile"
    let url=APP_URLS.updateProfile
    const requestOptions = {
        method: 'POST',
        headers: {
            Authorization: JSON.parse(localStorage.getItem('user')).data.token,
            // 'Content-Type':'application/json',
            // 'Content-Length':updateProfile.length
        },
        body:updateProfile
    };
    return fetch(url, requestOptions).then(handleResponse);
}
// function jobpost(jobpost) {
//     //let url = "http://ec2-18-191-154-59.us-east-2.compute.amazonaws.com/gigx/api/addJobPost"
//     let url =APP_URLS.addJobPost
//     const requestOptions = {
//         method: 'POST',
//         headers: {
//             Authorization: JSON.parse(localStorage.getItem('user')).data.token
//         },
//         body: jobpost
//     };
//     return fetch(url, requestOptions).then(handleResponse);
// }

function addDocumnet(userDoc) {
    //  let url = "http://ec2-18-191-154-59.us-east-2.compute.amazonaws.com/gigx/api/addDocument"
    let url = APP_URLS.addDocument
    const requestOptions = {
        method: 'POST',
        headers: {
            Authorization: JSON.parse(localStorage.getItem('user')).data.token
        },
        body: userDoc
    };
    return fetch(url, requestOptions).then(handleResponse);
}

// function getAllDoc() {
//     let url =APP_URLS.getAllDocuments
//     const requestOptions = {
//         method: 'GET',
//         headers: {
//             Authorization: JSON.parse(localStorage.getItem('user')).data.token
//         },
//     };

//     return fetch(url, requestOptions).then(handleResponse);
// }

// function getAlljobpost() {
//     //let url = "http://ec2-18-191-154-59.us-east-2.compute.amazonaws.com/gigx/api/getJobPostsByEmployerId"
//     let url = APP_URLS.getJobPostsByUserId

//     const requestOptions = {
//         method: 'GET',
//         headers: {
//             Authorization: JSON.parse(localStorage.getItem('user')).data.token
//         },
//     };
//     return fetch(url, requestOptions).then(handleResponse);
// }



// function getJobInstantViews() {
//     // let url = "http://localhost:5000/gigx/api/getAllJobPosts/1"
//     let url=APP_URLS.getAllJobPosts
//     const requestOptions = {
//         method: 'GET',
//         headers: {
//             Authorization: JSON.parse(localStorage.getItem('user')).data.token
//         },
//     };
//     return fetch(url, requestOptions).then(handleResponse);
// }

// New Instant Job Post call
function Instantjobpost(jobpost) {
    console.log('jobpost:',jobpost)
    
    //let url = "http://ec2-18-191-154-59.us-east-2.compute.amazonaws.com/gigx/api/addJobPost"
    // let url = "http://localhost:5000/gigx/api/applyForJob"
    let url=APP_URLS.applyForJob
    const requestOptions = {
        method: 'POST',

        headers: {
            Authorization: JSON.parse(localStorage.getItem('user')).data.token,
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(jobpost)
    };
    return fetch(url, requestOptions).then(handleResponse);
}

// TextJD Update call
function textJDUpdate(updatejob) {
    //let url = "http://ec2-18-191-154-59.us-east-2.compute.amazonaws.com/gigx/api/addJobPost"
    let url = APP_URLS.updateTextJD
    const requestOptions = {
        method: 'POST',
        headers: {
            Authorization: JSON.parse(localStorage.getItem('user')).data.token,
            //'Content-Type': 'application/json'
        },
        body: updatejob
    };
    return fetch(url, requestOptions).then(handleResponse);
}


//To view all applicants details for a Job Post(viewed by Employer)
function viewAllApplication(jobpostId) {
    // let url = 'http://localhost:5000/gigx/api/getJobApplicationsByPostId/'+jobpostId+'/'+1
    let url=APP_URLS.getJobApplicationsByPostId+jobpostId+'/'+1

    const requestOptions = {
        method: 'GET',
        headers: {
            Authorization: JSON.parse(localStorage.getItem('user')).data.token
        },
    };
    return fetch(url, requestOptions).then(handleResponse);
}
//updateJobAppsStatusById
function updateJobAppsStatusById(status) {
    let url =APP_URLS.update_Job_Offer_Status

    const requestOptions = {
        method: 'POST',
        headers: {
            Authorization: JSON.parse(localStorage.getItem('user')).data.token,
            //'Content-Type': 'application/json'
        },
        body: status
    };
    return fetch(url, requestOptions).then(handleResponse);
}
// handelresponse 
function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        console.log(data)
        if (!response.ok) {
            if (response.status === 401) {
                logout();
                // location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}