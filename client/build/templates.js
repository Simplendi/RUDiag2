angular.module('app').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/access.html',
    "<div class=page-border><div ng-if=\"state=='loading'\">Loading test</div><div ng-if=\"state=='error'\"><h1>Error</h1><p>An unknown error occured. Please try again later.</p></div><div ng-if=\"state=='unknown'\"><h1>Error</h1><p>Cannot open test. The test is unknown, not yet opened, or closed.</p></div><div ng-if=\"state=='form'\"><h1>{{test.title}}</h1><div ng-if=\"test.invite_method=='link'\"><p>Please provide your e-mailaddress below to request a invite</p><div class=row><div class=\"col-sm-offset-3 col-sm-6\"><input type=email class=form-control id=email placeholder=\"Enter e-mail\" ng-model=inviteData.email> <button type=submit class=\"btn btn-default\" ng-click=requestInvite()>Request invite</button></div></div></div></div></div>"
  );


  $templateCache.put('views/feedback.html',
    "<div class=row><div class=\"page-border col-xs-12\" ng-if=\"state=='loading'\">Loading</div><div class=\"page-border col-xs-12\" ng-if=\"state=='feedback'\"><h1>{{test.title}}</h1><div ng-repeat=\"content in test.content\"><div ng-if=\"content.type=='text'\" contentable ng-model=content.data></div><div ng-if=\"content.type=='question'\"><h3>Question {{contentToQuestionIndex($index)+1}}</h3><choice-question ng-if=\"content.data.type=='choice'\" data=content.data answer=test_session.answers[contentToQuestionIndex($index)]></choice-question><multiplechoice-question ng-if=\"content.data.type=='multiplechoice'\" data=content.data answer=test_session.answers[contentToQuestionIndex($index)]></multiplechoice-question><open-question ng-if=\"content.data.type=='open'\" data=content.data answer=test_session.answers[contentToQuestionIndex($index)]></open-question></div></div></div></div>"
  );


  $templateCache.put('views/home.html',
    "<div class=page-border><h1>RUDiag</h1><p>This is the RUDiag server. You probably wanted to visit a test. Please ask for the specific URL to the test.</p></div>"
  );


  $templateCache.put('views/test.html',
    "<div class=row><div class=\"page-border col-xs-12\" ng-if=\"state=='loading'\">Loading</div><div class=\"page-border col-xs-12\" ng-if=\"state=='data'\"><p>Please complete the following data to start the test.</p><form class=form-horizontal><div class=form-group><label for=name class=\"col-sm-2 control-label\">Name</label><div class=col-sm-10><input class=form-control id=name placeholder=\"Firstname Lastname\" ng-model=test_session.name></div><label for=student_id class=\"col-sm-2 control-label\">Student-ID</label><div class=col-sm-10><input class=form-control id=student_id placeholder=3123456 ng-model=test_session.student_id></div><label for=email class=\"col-sm-2 control-label\">Email</label><div class=col-sm-10><input class=form-control id=email placeholder=yourname@example.org ng-model=test_session.email></div><div class=\"col-sm-offset-2 col-sm-10\"><a href=\"\" class=\"btn btn-default\" ng-click=dataDone()>Done</a></div></div></form></div><div class=\"page-border col-xs-9\" ng-if=\"state=='answer'\"><h1>{{test.title}}</h1>{{test_session}}<div ng-repeat=\"content in test.content\"><div ng-if=\"content.type=='text'\" contentable ng-model=content.data></div><div ng-if=\"content.type=='question'\"><h3>Question {{contentToQuestionIndex($index)+1}}</h3><choice-question ng-if=\"content.data.type=='choice'\" data=content.data answer=test_session.answers[contentToQuestionIndex($index)]></choice-question><multiplechoice-question ng-if=\"content.data.type=='multiplechoice'\" data=content.data answer=test_session.answers[contentToQuestionIndex($index)]></multiplechoice-question><open-question ng-if=\"content.data.type=='open'\" data=content.data answer=test_session.answers[contentToQuestionIndex($index)]></open-question></div></div></div><div class=\"page-border col-xs-12\" ng-if=\"state=='done'\"><h1>{{test.title}}</h1>Your answers are submitted successfully. <span ng-if=\"test.feedback_timing=='at'\">You can see your results at {{test.feedback_at | timeFormat }} by visiting this page again.</span> <span ng-if=\"test.feedback_timing=='after'\">Your results will be available after {{test.feedback_after}} minutes by visting this page again.</span></div><div ng-if=\"state=='answer'\" class=\"col-xs-3 side-bar\"><div ng-if=\"state=='answer'\" class=\"col-xs-3 status-block page-border\">Last saved <span second-difference ng-model=test_session.updated_at scale=minutes></span> minutes ago <a href=\"\" ng-click=submit() class=\"btn btn-default\">Submit answers</a></div></div></div>"
  );


  $templateCache.put('views/test_submit.html',
    "<div class=modal-header><h3>Submit answers</h3></div><div class=modal-body>Are you sure you want to submit the answers? All answers are final after submitting.</div><div class=modal-footer><button ng-click=ok()>Submit answers</button> <button ng-click=cancel()>Cancel</button></div>"
  );


  $templateCache.put('views/directives/choice_question.html',
    "<div contentable ng-model=data.content.question_before></div><span class=question-option ng-repeat=\"choice in data.content.choices track by $index\"><input type=radio ng-model=$parent.answer ng-value=\"$index\"><div contentable class=question-option-content ng-model=data.content.choices[$index]></div></span><div contentable ng-model=data.content.question_after></div>"
  );


  $templateCache.put('views/directives/multiplechoice_question.html',
    "<div contentable ng-model=data.content.question_before></div><span class=question-option ng-repeat=\"choice in data.content.choices track by $index\"><input type=checkbox ng-click=toggleAnswerOption($index) ng-checked=\"$parent.answer.indexOf($index) >= 0\"><div contentable class=question-option-content ng-model=data.content.choices[$index]></div></span><div contentable ng-model=data.content.question_after></div>"
  );


  $templateCache.put('views/directives/open_question.html',
    "<div contentable ng-model=data.content.question_before ng-disabled=disabled></div><input ng-model=\"answer\"><div contentable ng-model=data.content.question_after ng-disabled=disabled></div>"
  );

}]);
