angular.module('splitPledgeService', [])
    .service('splitPledgeService', [
        'PledgeRepository',
        "$http",
        "$filter",
        function (
            pledgeRepository,
            $http,
            $filter) {

            var pledge = this;

            function getPledgeUnpaidTotal(pledge) {
                var unpaidTotal = 0;

                angular.forEach(pledge.ScheduledPledgePayments, function(element, index) {
                    if (element.ActualAmount === null) {
                        unpaidTotal += element.ExpectedAmount;
                    }
                });

                return unpaidTotal;
            }

            return {
                // get the pledge in question and store it in the services scope
                // this should be called before all other functions
                getPledge: function (pledgeGuid) {
                    if (pledge === undefined) {
                        pledge = this;
                    }

                    if (pledge.pledgeGuid === undefined) {
                        return $http({
                            method: 'Get',
                            url: ROUTES.GetPledgeDetail.formatWith(pledgeGuid)
                        })
                        .success(function (data) {
                            pledge = data.data;
                            return data.data;
                        });
                    } else {
                        // if pledge has already been loaded, just return that
                        return pledge;
                    }
                },
                getUnpaidPledgePayments: function (pledge) {
                    var unpaidPledgePayments = [];
                    for (var i = 0; i < pledge.ScheduledPledgePayments.length; i++) {
                        if (pledge.ScheduledPledgePayments[i].ActualAmount === null) { // payment is unpaid
                            var tempPayment = pledge.ScheduledPledgePayments[i];
                                unpaidPledgePayments.push(tempPayment);
                        }
                    }
                    return unpaidPledgePayments;
                },
                // get list of unpaid scheduled pledge payments, limited by a donation amount
                getLimitedUnpaidPledgePayments: function(donationAmount, pledge, scheduledPledgePaymentId) {
                    var limitedUnpaidPledgePayments = [];
                    var scheduledPledgePayment = $filter('filter')(pledge.ScheduledPledgePayments, { ScheduledPledgePaymentId: scheduledPledgePaymentId })[0];
                    scheduledPledgePayment.amountReceived = scheduledPledgePayment.ExpectedAmount;
                    scheduledPledgePayment.balance = 0;
                    limitedUnpaidPledgePayments.push(scheduledPledgePayment);
                    var totalUnpaidAmount = this.getPledgeUnpaidTotal(pledge);
                    if (donationAmount >= totalUnpaidAmount) {
                        for (var i = 0; i < pledge.ScheduledPledgePayments.length; i++) {
                            if (pledge.ScheduledPledgePayments[i].ActualAmount === null && pledge.ScheduledPledgePayments[i].ScheduledPledgePaymentId !== scheduledPledgePaymentId) { // payment is unpaid
                                var tempPayment = {};
                                tempPayment = pledge.ScheduledPledgePayments[i];
                                tempPayment.amountReceived = tempPayment.ExpectedAmount;
                                tempPayment.balance = 0;
                                limitedUnpaidPledgePayments.push(tempPayment);
                            }
                        }
                        return limitedUnpaidPledgePayments;
                    }
                    var filteredTotalAmount = donationAmount - scheduledPledgePayment.ExpectedAmount;
                    var filteredScheduledPledgePayments = $filter('filter')(pledge.ScheduledPledgePayments,
                        function(item) {
                            return item.ScheduledPledgePaymentId !== scheduledPledgePaymentId && item.ActualAmount === null; 
                        });
                    filteredScheduledPledgePayments.sort(function(a, b) {
                        return b.ExpectedDate - a.ExpectedDate;
                    });
                    filteredScheduledPledgePayments.reverse();
                    var subsets = this.getPossibleCombinations(filteredScheduledPledgePayments, 1);
                    var arrSum = [];
                    for (var j = 0; j < subsets.length; j++) {
                        var tempSum = {};
                        tempSum.SumAmount = 0;
                        for (var k = 0; k < subsets[j].length; k++) {
                             tempSum.Index = j;
                             tempSum.SumAmount = tempSum.SumAmount + subsets[j][k].ExpectedAmount;
                        }
                        arrSum.push(tempSum);
                    }
                    arrSum.sort(function (a, b) {
                        if (a.SumAmount - b.SumAmount < 0)
                            return a.SumAmount - b.SumAmount;
                        else if (a.SumAmount - b.SumAmount == 0)
                            return a.Index - b.Index;
                        else
                            return a.SumAmount - b.SumAmount;
                    });
                    var index = -1;
                    var newIndex = -1;
                    var oldSumAmount = -1;
                    for (var x = 0; x < arrSum.length; x++) {
                        if (x == 0) {
                            oldSumAmount = arrSum[x].SumAmount;
                        }
                        if ((arrSum[x].SumAmount <= filteredTotalAmount && oldSumAmount != arrSum[x].SumAmount && x > 0)
                            || (arrSum[x].SumAmount <= filteredTotalAmount && x == 0))
                        {
                            index = arrSum[x].Index;
                            oldSumAmount = arrSum[x].SumAmount;
                            if (arrSum[x].SumAmount == filteredTotalAmount  && newIndex == -1) {
                                newIndex = index;
                            }
                            if (newIndex != -1) {
                                index = newIndex;
                            }
                        }
                    }
                    if (index != -1) {
                        angular.forEach(subsets[index], function(item) {
                            limitedUnpaidPledgePayments.push(item);
                        });
                    }
                    return limitedUnpaidPledgePayments;
                },
                getPossibleCombinations: function (a, min) {
                    var fn = function (n, src, got, all) {
                        if (n == 0) {
                            if (got.length > 0) {
                                all[all.length] =  got ;
                            }
                            return;
                        }
                        for (var j = 0; j < src.length; j++) {
                            fn(n - 1, src.slice(j + 1), got.concat(src[j]), all);
                        }
                        return;
                    }
                    var all = [];
                    for (var i = min; i < a.length; i++) {
                        fn(i, a, [], all);
                    }
                    all.push(a);
                    return all;
                },
                // based on the options selected, update the given pledge
                updateDonation: function (donationAmount, pledge, primaryOption, secondaryOption) {

                    // if it's all good, return true and move on
                    return true;
                },
                getPledgeUnpaidTotal: function (pledge) {
                    var unpaidTotal = 0;

                    angular.forEach(pledge.ScheduledPledgePayments, function (element, index) {
                        if (element.ActualAmount === null) {
                            unpaidTotal += element.ExpectedAmount;
                        }
                    });

                    return unpaidTotal;
                },
                getScheduledPledgePaymentAmount: function (pledge, scheduledPledgePaymentId) {

                    var scheduledPledgePaymentAmount = 0;

                    scheduledPledgePaymentAmount = $filter('filter')(pledge.ScheduledPledgePayments, { ScheduledPledgePaymentId: scheduledPledgePaymentId })[0].ExpectedAmount;

                    return scheduledPledgePaymentAmount;
                },
                getDifference: function (donationAmount, pledge, scheduledPledgePaymentId) {
                    var scheduledPledgePaymentAmount = $filter('filter')(pledge.ScheduledPledgePayments, { ScheduledPledgePaymentId: scheduledPledgePaymentId })[0].ExpectedAmount;
                    var difference = donationAmount - scheduledPledgePaymentAmount;
                    difference = Math.abs(difference);

                    return difference;
                },
                getUnpaidPledgeTotal: function(pledge) {
                    var unpaidTotal = 0;

                    for (var i = 0; i < pledge.ScheduledPledgePayments.length; i++) {
                        if (pledge.ScheduledPledgePayments[i].ActualAmount === null) { // payment is unpaid
                            unpaidTotal += pledge.ScheduledPledgePayments[i].ExpectedAmount;
                        }
                    }
                    return unpaidTotal;
                },
                getPayment: function(pledge, paymentId) {
                    return $filter('filter')(pledge.ScheduledPledgePayments, { ScheduledPledgePaymentId: paymentId })[0];
                },
                getScheduledPledgePaymentDetails: function (pledge, scheduledPledgePaymentId) {
                    return $filter('filter')(pledge.ScheduledPledgePayments, { ScheduledPledgePaymentId: scheduledPledgePaymentId })[0];
                }
            }
        }
    ]);