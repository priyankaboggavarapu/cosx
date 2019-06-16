
// local env
 let baseUrl='http://localhost:5000/gigx/api/';

// production env
//let baseUrl='https://gigxapp.com/gigx/api/';

// dev env
//let baseUrl='http://ec2-18-191-154-59.us-east-2.compute.amazonaws.com/gigx/api/';

export const APP_URLS ={
    getUploadedFile: baseUrl+'getUploadedFile',
    generateOTP: baseUrl+'generateOTP',
    login: baseUrl+'login',
    signup: baseUrl+'signup',
    AddProfile: baseUrl+'addProfile',
    updateTextResume: baseUrl+'updateTextResume',
    addJobPost: baseUrl+'addJobPost',
    AddDocument: baseUrl+'addDocument',
    getAllDocuments:baseUrl+'getAllDocuments/1',
    getJobPostsByUserId:baseUrl+'getJobPostsByUserId/1',
    getAllJobPosts:baseUrl+'getAllJobPosts/1',
    apply_For_Job:baseUrl+'apply_For_Job',
    updateTextJD:baseUrl+'updateTextJD',
    updateVideoJD:baseUrl+'updateVideoJD',
    updateJobPost:baseUrl+'updateJobPost',
    viewJobApplicantsByJobPostID :baseUrl+'viewJobApplicantsByJobPostID/',
    update_Job_Offer_Status:baseUrl+'update_Job_Offer_Status',
    getProfile:baseUrl+'getProfile',
    updateVideoResume:baseUrl+'updateVideoResume',
    updateProfile:baseUrl+'updateUserProfile',
    applyForJob:baseUrl+'applyForJob',
    getJobApplicationsByPostId:baseUrl+'getJobApplicationsByPostId',
    getMyJobApplications:baseUrl+'getMyJobApplications/1',
    initiateOffer:baseUrl+'initiateOffer',
    addInstitutionAccount:baseUrl+'addInstitutionAccount',
    scheduleInterview:baseUrl+'scheduleInterview',
    updateJobApplicationStatus:baseUrl+'updateJobApplicationStatus',
    getFreelancersAndCampusHires:baseUrl+'getFreelancersAndCampusHires/1',
    requestBgvCheck:baseUrl+'requestBgvCheck',
    updateUserProfileStatus:baseUrl+'updateUserProfileStatus',
    deleteDocument:baseUrl+'deleteDocument',
    addInstitutionPost:baseUrl+'addInstitutionPost',
    getAllInstitutionPosts:baseUrl+'getAllInstitutionPosts/1',
    getCandidatesByInstitutionPostId:baseUrl+'getCandidatesByInstitutionPostId',
    sendRequestToInstitution:baseUrl+'sendRequestToInstitution',
    getInstitutionAccount:baseUrl+'getInstitutionAccount',
    acceptOrRejectRequest:baseUrl+'acceptOrRejectRequest',
    getBulkData:baseUrl+'getBulkData',
    getCompaniesInterested:baseUrl+'getCompaniesInterested',
    acceptOrRejectRequest:baseUrl+'acceptOrRejectRequest',
    scheduleInterviewForInstitutionPost:baseUrl+'scheduleInterviewForInstitutionPost',
    addCandidatesForCampusHire:baseUrl+'addCandidatesForCampusHire',
    getJobApplicationsForInsitutionCandidate:baseUrl+'getJobApplicationsForInsitutionCandidate',
    initiateOffer:baseUrl+'initiateOffer',
    initiateOfferForInstitutionCandidate:baseUrl+'initiateOfferForInstitutionCandidate',
    updateInterviewOrOfferStatus:baseUrl+'updateInterviewOrOfferStatus',
    shareDocuments:baseUrl+'sharedocuments',


}
