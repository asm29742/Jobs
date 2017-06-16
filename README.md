# Jobs
Job Portal

Web APIs - Basic implementaion of Job portal

1> API to create Job - 

URL: /jobs/createJob
METHOD: Post

Request:(Example)

salary:10000,
jobLocation:Bangalore,
qualifications:BE,
hiringOrganizationName:Bellus,
orgainizationDescription:Inovate,
skillsRequired:PHP,
workHours:9,
workingDays:5,
contactPersonName:Kumar,
contactPersonEmail:kum@email.com,
contactPersonPhNo:3216549870,
status:open,
jobType:partTime,
jobDescription:test JD,
priority:medium,

2> API to create Candidate 

URL: /candidates/createCandidate
METHOD: Post

Request:(Example) - Multipart / Formdata (If File upload is required)

name:Raj,
phone:1234567890,
email:ak@email.com,
technicalSkills:Java,
technicalSkills:Node,
technicalSkills:Angular,
technicalSkills:PHP,
totalExperience:5,
locationPrefernce:Bangalore,
currentLocation:Bangalore,
noticePeriod:3,
educationQualification:BE,

3> API to get matching candidates for a job

URL: /candidates/getCandidatesForJob/<jobId>
METHOD: Get

4> API to get matching jobs for a candidate
URL: /candidates/getJobsForCandidates/<candidateId>
METHOD: Get

5> API to get all Jobs 
URL: /jobs/getAllJobs
METHOD: Get

6> API to get all Candidates
URL: /candidates/getAllCandidates
METHOD: Get

7> API to get single Candidate 
URL: candidates/getCandidate/<candidateId>
METHOD: Get

8> API to update Candidate
URL: /candidates/updateCandidate/<candidateId>
METHOD: Put

Request (To update fields):

name:Raj
phone:1234567890
email:ak@email.com
technicalSkills:Java
technicalSkills:Node
technicalSkills:Angular
technicalSkills:PHP
totalExperience:5
locationPrefernce:Bangalore
currentLocation:Bangalore
noticePeriod:3
educationQualification:BE

9> API to get single Job 
URL: /jobs/getJob/<jobId>
METHOD: Get

10> API to update Job 
URL: /jobs/updateJob/<jobId>
METHOD: Put

Request (To update fields):

salary:10000
jobLocation:Bangalore
qualifications:BE
hiringOrganizationName:Bellus
orgainizationDescription:Inovate
skillsRequired:PHP
workHours:9
workingDays:5
contactPersonName:Kumar
contactPersonEmail:kum@email.com
contactPersonPhNo:3216549870
status:open
jobType:partTime
jobDescription:test JD
priority:medium


