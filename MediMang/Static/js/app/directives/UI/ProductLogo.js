angular.module('app').directive('productLogo', [
    'application', function (application) {
        return {
            restrict: 'E',
            compile: function (element, attrs) {
                var logos = {
                    volunteer: '/static/images/brand/volunteer/volunteersolutions.png',
                    volunteerSquare: '/static/images/brand/volunteer/vs-square.png',
                    admin: '/static/images/admin.png',
                    crm: '/static/images/brand/giftworks/gift-works-logo-large.png',
                    crmSquare: '/static/images/brand/giftworks/gift-works_icon.png'
                }

                log('application from master page', attrs);
                var app = attrs.app || application;
                var ratio = attrs.ratio || 'landscape';
                var imgUrl = logos.crm;
                var cssClass = attrs.cssclass || '';

                log('attrs.cssclass', attrs.cssclass);
                switch (app) {
                    case 'CRMAdmin':
                        imgUrl = logos.admin;
                        break;
                    case 'CRM':
                        ratio === 'square' ? imgUrl = logos.crmSquare : imgUrl = logos.crm;
                        break;
                    case 'VolunteerAdmin':
                        ratio === 'square' ? imgUrl = logos.volunteerSquare : imgUrl = logos.volunteer;
                        break;
                    default:
                        ratio === 'square' ? imgUrl = logos.crmSquare : imgUrl = logos.crm;
                        console.warn('no logo found for application');
                        break;

                }

                var imgTemplate = '<img src="{0}" class="img-responsive {1}" alt="Logo">';
                element.replaceWith(imgTemplate.formatWith(imgUrl, cssClass));

            }
        }
    }
]);