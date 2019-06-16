import { userConstants } from '../_constants';
import { userService } from '../_services/user.service';
import { alertActions } from './';
import { history } from '../_helpers';
import '../App';
import toastr from 'reactjs-toastr';
import 'reactjs-toastr/lib/toast.css';

export const userActions = {
    login,
    logout,
    //register,
    loginOtp,
    profile,
    addDocumnet,
    //jobpost,
    // getAllDoc,
    //getAlljobpost,
    Jobseeker:"",
    Employer : "",
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

{/* <Router>
<Route exact path="/register" component={RegisterPage} />
</Router> */}



function loginOtp(email) {
    return dispatch => {
        dispatch(request({ email }));

        userService.loginOtp(email)
            .then(

                user => {
                    if(user.code == "200"){
                        dispatch(success(user));
                        dispatch(alertActions.success(toastr.success('OTP Sent Successful To Your Registered Email ')));
                    }
                    if(user.code == "204"){
                        dispatch(success(user));
                        dispatch(alertActions.error(toastr.error('Please verify your Email')));
                        // setTimeout(() => {
                        //    // window.location.reload();
                        //   }, 3000)
                    }
                    
                    //history.push('/');
                },
                error => {

                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}
function login(email, login_Otp) {
    return dispatch => {
        dispatch(request({ email }));
       let user = JSON.parse(localStorage.getItem("user"));
        userService.login(email, login_Otp)
            .then(
                user => {
                    if (user.code == 200) {
                        dispatch(success(user));
                        history.push('/dashboard/Myprofile');
                    }
                
                    else {
                        dispatch(failure('Please enter the correct OTP'));
                        dispatch(alertActions.error(toastr.error('Please enter valid OTP')));
                        // alert('Please enter the correct OTP')
                    }
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                    dispatch(alertActions.error(toastr.error('Please enter valid OTP')));

                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

// function register(user) {
//     return dispatch => {
//         dispatch(request(user));
//         userService.register(user)
//             .then(
//                 user => {
//                     dispatch(success());
//                     if(user.code=='200'){
//                         history.push('/login');
//                         dispatch(alertActions.success(toastr.success('Registration successfully and sent Verification to Your Email', { displayDuration: 3000, })));
//                     }
//                     if(user.code=='400' && user.message.message){
//                         dispatch(alertActions.error(toastr.error(user.message.message, { displayDuration: 3000, })));
//                     }
//                     else if(user.code=='400' && user.message=="Email_id already exists"){
//                         dispatch(alertActions.error(toastr.error(user.message, { displayDuration: 3000, })));
//                     }
//                     else if(user.code=='400' && user.message.code==11000){
//                         dispatch(alertActions.error(toastr.error(user.message.errmsg, { displayDuration: 3000, })));
//                     }
//                 },
//                 error => {
//                     dispatch(failure(error.toString()));
//                     dispatch(alertActions.error(error.toString()));
//                 }
//             );
//     };

//     function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
//     function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
//     function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
// }
function profile(user) {
    return dispatch => {
        dispatch(request(user));
        userService.profile(user)
            .then(
                user => {
                    dispatch(success());
                    if(user.status == "200"){
                        dispatch(alertActions.success('Profile successful'));
                        dispatch(alertActions.success(toastr.success('Profile created successfully', { displayDuration: 3000, })));
                    }
                    else{
                        dispatch(alertActions.error(toastr.error('Try again....', { displayDuration: 3000, })));
                    }
                    // history.push('/login');
                    dispatch(alertActions.success('Profile successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getProfile() {
    return dispatch => {
        dispatch(request());
        userService.getProfile()
            .then(
                profile => {
                    dispatch(success(profile))
                    console.log('getprofile:',profile)
                  
                 },
                error => {
                    dispatch(failure(error.toString()))
                }
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(profile) { return { type: userConstants.GETALL_SUCCESS, profile } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}
// function jobpost(jobpost) {
//     return dispatch => {
//         dispatch(request(jobpost));
//         userService.jobpost(jobpost)
//             .then(
//                 jobpost => {
//                     dispatch(success());
//                     if(jobpost.status == 200){
//                     dispatch(alertActions.success(toastr.success('Job Posted Sucessfully', 
//                     { displayDuration: 1000000000000000000000, })));
//                     dispatch(alertActions.success('jobpost successful'));
//                     }
//                     else{
//                         dispatch(alertActions.error(toastr.error('Try again....', { displayDuration: 3000, })));  
//                     }
//                 },
//                 error => {
//                     dispatch(failure(error.toString()));
//                     dispatch(alertActions.error(error.toString()));
//                 }
//             );
//     };

//     function request(jobpost) { return { type: userConstants.REGISTER_REQUEST, jobpost } }
//     function success(jobpost) { return { type: userConstants.REGISTER_SUCCESS, jobpost } }
//     function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
// }

// new job instant post textJDUpdate
function Instantjobpost(jobpost) {
    return dispatch => {
        dispatch(request(jobpost));
        userService.Instantjobpost(jobpost)
            .then(
                jobpost => {
                    if(jobpost.code==200){
                        dispatch(success());
                        dispatch(alertActions.success('jobpost successful'));
                        dispatch(alertActions.success(toastr.success('Applied job successfully', 
                        { displayDuration: 1000000000000000000000, })));
                    }
                    else{
                        dispatch(alertActions.success(toastr.error('error', 
                        { displayDuration: 1000000000000000000000, })));
                    }
                    
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}
// add Documnets
function addDocumnet(userDoc) {
    return dispatch => {
        dispatch(request(userDoc));
        userService.addDocumnet(userDoc)
            .then(
                userDoc => {
                    dispatch(success());
                    dispatch(alertActions.success('Document successfully created'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(userDoc) { return { type: userConstants.REGISTER_REQUEST, userDoc } }
    function success(userDoc) { return { type: userConstants.REGISTER_SUCCESS, userDoc } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}
// getAllDocuments
// function getAllDoc() {
//     return dispatch => {
//         dispatch(request());
//         userService.getAllDoc()
//             .then(
//                 documents => dispatch(success(documents)),
                
//                 error => dispatch(failure(error.toString()))
//             );
//     };

//     function request() { return { type: userConstants.GETALL_REQUEST } }
//     function success(documents) { return { type: userConstants.GETALL_SUCCESS, documents } }
//     function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
// }
// function getAlljobpost() {
//     return dispatch => {
//         dispatch(request());

//         userService.getAlljobpost()
//             .then(
//                 users => dispatch(success(users)),
//                 error => dispatch(failure(error.toString()))
//             );
//     };

//     function request() { return { type: userConstants.GETALL_REQUEST } }
//     function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
// }


// function getJobInstantViews() {
//     return dispatch => {
//         dispatch(request());

//         userService.getJobInstantViews()
//             .then(
//                 users =>{ 
//                     if(users.data.length>0){
//                     dispatch(success(users))
//                     }
//                     else{
//                         dispatch(alertActions.error(toastr.error('No records Found', 
//                         { displayDuration: 1000000000000000000000, })));
                        
//                     }
//                 },
//                 error => dispatch(failure(error.toString()))
//             );
//     };

//     function request() { return { type: userConstants.GETALL_REQUEST } }
//     function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
// }
//  textJDUpdate
function textJDUpdate(updatejob) {
    return dispatch => {
        dispatch(request(updatejob));
        userService.textJDUpdate(updatejob)
            .then(
                updatejob => {
                    dispatch(success());
                    // history.push('/login');
                    dispatch(alertActions.success('updatejob successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

//  textResumeUpdate
function ProfiletextResumeUpdate(updateTextResume) {
    return dispatch => {
        dispatch(request(updateTextResume));
        userService.ProfiletextResumeUpdate(updateTextResume)
            .then(
                updateTextResume => {
                    dispatch(success());
                    // history.push('/login');
                    if(updateTextResume.status==200){
                    dispatch(alertActions.success('updatejob successfully'));
                    dispatch(alertActions.success(toastr.success('updated successfully', 
                    { displayDuration: 1000000000000000000000, })));

                    }
                    else{
                        dispatch(alertActions.error(toastr.error('Try Again....', 
                        { displayDuration: 1000000000000000000000, })));
                    }
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

//  VideoResumeUpdate
function ProfileVideoResumeUpdate(updateVideoResume) {
    return dispatch => {
        dispatch(request(updateVideoResume));
        userService.ProfileVideoResumeUpdate(updateVideoResume)
            .then(
                updateVideoResume => {
                    dispatch(success());
                    if(updateVideoResume.status==200){
                    dispatch(alertActions.success('updatejob successful'));
                    dispatch(alertActions.success(toastr.success('updated successfully', 
                    { displayDuration: 1000000000000000000000, })));

                    }
                    else{
                        dispatch(alertActions.error(toastr.error('Try Again....', 
                        { displayDuration: 1000000000000000000000, })));
                    }
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

//  UpdateProfile
function ProfileUpdate(updateProfile) {
    return dispatch => {
        dispatch(request(updateProfile));
        userService.ProfileUpdate(updateProfile)
            .then(
                result => {
                    dispatch(success());
                //    if(result.status==200){
                    dispatch(alertActions.success('updatejob successful'));
                //    dispatch(alertActions.success(toastr.success('Profile updated successful', { displayDuration: 3000, })));
                //    }
                //    else{
                //     dispatch(alertActions.error(toastr.error('Try Again....', { displayDuration: 3000, })));

                //    }
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function viewAllApplication(jobpostId) {
    return dispatch => {
        dispatch(request(jobpostId));

        userService.viewAllApplication(jobpostId)
            .then(
              
                viewJobs => {
                    if(viewJobs.code==200){
                        dispatch(success(viewJobs))
                    }
                    if(viewJobs.code==204){
                        dispatch(failure('No Job Applications Found'));
                        dispatch(alertActions.error(toastr.error('No Job Applications Found', { displayDuration: 1000, })));
                    }
                },
                error =>{ 
                    dispatch(failure(error.toString()))
                }
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}



function updateJobAppsStatusById(status) {
    return dispatch => {
        dispatch(request(status));

        userService.updateJobAppsStatusById(status)
            .then(
              
                users => {
                    if(users.code==200){
                        dispatch(success('success'))
                    }
                    if(users.code==204){
                        dispatch(failure('No Job Applications Found'));
                        dispatch(alertActions.error(toastr.error('No Job Applications Found', { displayDuration: 1000, })));
                    }
                },
                error =>{ 
                    dispatch(failure(error.toString()))
                }
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}