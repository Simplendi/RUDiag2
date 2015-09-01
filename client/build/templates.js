angular.module('app').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/access.html',
    "<div><div ng-if=\"state=='loading'\">Loading test</div><div ng-if=\"state=='error'\"><h1>Error</h1><p>An unknown error occured. Please try again later.</p></div><div ng-if=\"state=='unknown'\"><h1>Error</h1><p>Cannot open test. The test is unknown, not yet opened, or closed.</p></div><div ng-if=\"state=='form'\"><h1>{{test.title}}</h1><div ng-if=\"test.invite_method=='link'\"><p>Please provide your e-mailaddress below to request a invite</p><div class=row><div class=\"col-sm-offset-3 col-sm-6\"><input type=email class=form-control id=email placeholder=\"Enter e-mail\" ng-model=inviteData.email> <button type=submit class=\"btn btn-default\" ng-click=requestInvite()>Request invite</button></div></div></div></div></div>"
  );


  $templateCache.put('views/home.html',
    "<div><h1>RUDiag</h1><p>This is the RUDiag server. You probably wanted to visit a test. Please ask for the specific URL to the test.</p></div>"
  );


  $templateCache.put('views/test.html',
    "<div><div ng-if=loading>Loading</div><div ng-if=!loading><h1>{{test.title}}</h1>{{test_session}}<div ng-repeat=\"content in test.content\"><div ng-if=\"content.type=='text'\" contentable ng-model=content.data></div><div ng-if=\"content.type=='question'\"><h3>Question {{contentToQuestionIndex($index)+1}}</h3><choice-question ng-if=\"content.data.type=='choice'\" data=content.data answer=test_session.answers[contentToQuestionIndex($index)]></choice-question><multiplechoice-question ng-if=\"content.data.type=='multiplechoice'\" data=content.data answer=test_session.answers[contentToQuestionIndex($index)]></multiplechoice-question><open-question ng-if=\"content.data.type=='open'\" data=content.data answer=test_session.answers[contentToQuestionIndex($index)]></open-question></div></div></div></div>"
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
