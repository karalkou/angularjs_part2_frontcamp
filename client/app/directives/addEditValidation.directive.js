export default function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attr, ctrl) {
            function validator(ngModelValue) {
                if (ngModelValue.length <= 10) {
                    ctrl.$setValidity('maxLengthValidator', true);
                } else {
                    ctrl.$setValidity('maxLengthValidator', false);
                }
                return ngModelValue;
            }
            ctrl.$parsers.push(validator);
        }
    };
}
