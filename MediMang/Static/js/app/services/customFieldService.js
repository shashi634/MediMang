angular.module('customFieldService', [])
    .service('customFieldService', ['$filter',  function ($filter) {
        return {
            generateCustomFields: function (customFields) {
                inputs = [];
                selectedOptions = null;
                allOptions = [];
                angular.forEach(customFields, function (customField) {
                    selectedOptions = [];
                    allOptions = [];
                    if (!customField.IsHidden) {
                        if (customField.CustomFieldType === 3 || customField.CustomFieldType === 4) {
                            allOptions = [];
                            angular.forEach(customField.CustomFieldListOptions, function (value) {
                                option = {}
                                option.CustomFieldValueId = value.CustomFieldValueId;
                                option.id = value.CustomFieldValueId;
                                option.Name = value.CustomFieldValueName;
                                option.CustomFieldValueOrder = value.CustomFieldValueOrder;
                                option.IsHidden = value.IsHidden;
                                if (!option.IsHidden) {
                                    allOptions.push(option);
                                }
                            });
                        }

                        if (customField.CustomFieldType === 5) {

                            var date = customField.DefaultValue == null ? '' : moment(customField.DefaultValue).format();
                            customField.DefaultValue = date === "" ? "" : date;
                        }

                        if (customField.CustomFieldType === 3 && customField.CustomFieldListDefaultValues != undefined && customField.CustomFieldListDefaultValues.length > 0) {
                            selectedOptions = {};
                            if (!customField.CustomFieldListDefaultValues[0].CustomFieldValue.IsHidden) {
                                selectedOptions.id = customField.CustomFieldListDefaultValues[0].CustomFieldValue.CustomFieldValueId;
                                selectedOptions.Name = customField.CustomFieldListDefaultValues[0].CustomFieldValue.CustomFieldValueName;
                            }
                        }
                        else if (customField.CustomFieldType === 4 && customField.CustomFieldListDefaultValues != undefined && customField.CustomFieldListDefaultValues.length > 0) {
                            selectedOptions = [];
                            angular.forEach(customField.CustomFieldListDefaultValues, function (value) {
                                selectedOption = {}
                                if (!value.CustomFieldValue.IsHidden) {
                                    selectedOption.CustomFieldValueId = value.CustomFieldValue.CustomFieldValueId;
                                    selectedOption.id = value.CustomFieldValue.CustomFieldValueId;
                                    selectedOption.Name = value.CustomFieldValue.CustomFieldValueName;
                                    selectedOption.CustomFieldValueOrder = value.CustomFieldValue.CustomFieldValueOrder;
                                    selectedOption.isHidden = value.CustomFieldValue.IsHidden;
                                    selectedOptions.push(selectedOption);
                                }
                            });
                        }

                        input = {};
                        input.label = customField.CustomFieldLabel;
                        input.isRequired = customField.IsRequired;
                        input.inputType = customField.CustomFieldType;
                        input.checked = customField.DefaultValue;
                        input.value = customField.DefaultValue;
                        input.select = selectedOptions;
                        input.activities = allOptions;
                        input.CustomFieldGuid = customField.CustomFieldGuid;
                        input.CustomFieldType = customField.CustomFieldType;
                        input.isHidden = customField.IsHidden;
                        inputs.push(input);

                    }
                });

                return inputs;

            },
            isCustomFieldsValid: function (customFieldGroups) {

                var errors = [];

                angular.forEach(customFieldGroups, function (group) {
                    angular.forEach(group.inputs, function (customField) {
                        var setError = function (c) {
                            errors.push({
                                Description: c.label + ' is required.'
                            });
                        }

                        switch (customField.inputType) {
                            case 1:// textbox 
                            case 6:// for number 
                            case 7:// for currency
                            case 8:// for textarea 
                                if (customField.isRequired && (customField.value == null || customField.value === ''))
                                    setError(customField);

                                break;
                            case 2:// checkbox 
                                if (customField.isRequired && customField.checked === null) {
                                    setError(customField);
                                }
                                break;
                            case 3:// for single  select
                                if (customField.select == null) {
                                    if (customField.isRequired) {
                                        setError(customField);
                                    }
                                }
                                else {
                                    if (customField.isRequired && (customField.select.id === 0 || customField.select.id === null || customField.select.id === undefined)) {
                                        setError(customField);;
                                    }
                                }

                                break;
                            case 4:    // for multi-select
                                if (customField.select == null && customField.selectedName == null) {
                                    if (customField.isRequired) {
                                        setError(customField);
                                    }
                                }
                                else {
                                    if (customField.select && customField.select.length === 0 && customField.isRequired) {
                                        setError(customField);
                                    }
                                    else if (customField.selectedName && customField.selectedName.length === 0 && customField.isRequired) {
                                        setError(customField);
                                    }
                                }
                                break;
                            case 5:// for date type
                                if (customField.isRequired) {
                                    if (customField.value !== undefined && (customField.value == null || customField.value === ''))
                                        setError(customField);
                                    else if (customField.Date !== undefined && (customField.Date == null || customField.Date === ''))
                                        setError(customField);
                                    else if(customField.Date === undefined && customField.value === undefined)
                                        setError(customField);
                                }
                                break;
                        }
                    });

                });
                var errorMsg = [];
                if (errors.length > 0)
                    errorMsg.push(errors[0]);
                return errorMsg;
            },

            isCustomFieldsValidWithFilledAnswer: function (customFieldGroups, customFieldAnswers) {
                var errors = [];
                angular.forEach(customFieldGroups, function (group) {
                    angular.forEach(group.inputs, function (customField) {
                        var setError = function (c) {
                            errors.push({
                                Description: c.label + ' is required.'
                            });
                        }
                        var answeredCustomField = $filter('filter')(customFieldAnswers, function (value) {
                            return value.CustomFieldGuid === customField.CustomFieldGuid;
                        });

                        switch (customField.inputType) {
                            case 1:// textbox 
                            case 6:// for number 
                            case 7:// for currency
                            case 8:// for textarea 
                                if (customField.isRequired && answeredCustomField && answeredCustomField.length > 0 && customField.value != undefined && (customField.value == null || customField.value === ''))
                                    setError(customField);

                                break;
                            case 2:// checkbox 
                                if (customField.isRequired && answeredCustomField && answeredCustomField.length > 0 && customField.value != undefined && customField.checked === null) {
                                    setError(customField);
                                }
                                break;
                            case 3:// for single  select
                                if (customField.select == null) {
                                    if (customField.isRequired && answeredCustomField && answeredCustomField.length > 0 && customField.select != undefined) {
                                        setError(customField);
                                    }
                                }
                                else {
                                    if (customField.isRequired && answeredCustomField && answeredCustomField.length > 0 && customField.select != undefined && (customField.select.id === 0 || customField.select.id === null || customField.select.id === undefined)) {
                                        setError(customField);;
                                    }
                                }

                                break;
                            case 4:    // for multi-select
                                if (customField.select == null && customField.selectedName == null && (customField.select != undefined || customField.selectedName != undefined)) {
                                    if (customField.isRequired && answeredCustomField && answeredCustomField.length > 0) {
                                        setError(customField);
                                    }
                                }
                                else {
                                    if (customField.select && customField.select.length === 0 && customField.selectedName.length === 0 && customField.isRequired && answeredCustomField && answeredCustomField.length > 0) {
                                        setError(customField);
                                    }
                                    else if (customField.selectedName && customField.selectedName.length === 0 && customField.select.length === 0 && customField.isRequired && answeredCustomField && answeredCustomField.length > 0) {
                                        setError(customField);
                                    }
                                }
                                break;
                            case 5:// for date type
                                if (customField.isRequired && answeredCustomField && answeredCustomField.length > 0) {
                                    if (customField.value !== undefined && (customField.value == null || customField.value === ''))
                                        setError(customField);
                                    else if (customField.Date !== undefined && (customField.Date == null || customField.Date === ''))
                                        setError(customField);
                                }
                                break;
                        }
                    });

                });
                var errorMsg = [];
                if (errors.length > 0)
                    errorMsg.push(errors[0]);
                return errorMsg;

            },

            getFieldAnswer: function (customField) {
                var fieldAnswer = null;
                switch (customField.inputType) {
                    case 1:// textbox 
                    case 6:// for number 
                    case 7:// for currency
                    case 8:// for textarea 
                        fieldAnswer = customField.value;
                        break;
                    case 2:// checkbox 
                        fieldAnswer = customField.checked;
                        break;
                    case 3:// for single  select
                        SelectedIds = [];
                        if (customField.select != null) {
                            SelectedIds.push(customField.select.id);
                            fieldAnswer = "[" + SelectedIds + "]";
                        }
                        break;
                    case 4:    // for multi-select
                        SelectedIds = [];
                        if (customField.select != null && customField.select != undefined && customField.select.length > 0) {
                            angular.forEach(customField.select, function (value) {
                                SelectedIds.push(value.id);
                            });
                            fieldAnswer = "[" + SelectedIds + "]";
                        }
                        else if (customField.selectedName != null) {
                            angular.forEach(customField.selectedName, function (value) {
                                SelectedIds.push(value.id);
                            });
                            fieldAnswer = "[" + SelectedIds + "]";
                        }
                        break;
                    case 5: // for date type  
                        fieldAnswer = {};
                        fieldAnswer = customField.Date !== undefined ? customField.Date : customField.value;
                        break;
                }
                return fieldAnswer;
            },

            // Creating, populating and binding custom fields with answer data
            generateCustomFieldsWithAnswer: function (customFields, customFieldAnswers) {
              
                var inputs = [];
                var selectedOptions = null;
                var allOptions = [];
                angular.forEach(customFields, function(customField) {
                    var input = {};
                    input.label = customField.CustomFieldLabel;
                    input.isRequired = customField.IsRequired;
                    input.inputType = customField.CustomFieldType;
                    input.CustomFieldGuid = customField.CustomFieldGuid;
                    if (customField.CustomFieldType === 3 || customField.CustomFieldType === 4) {
                        allOptions = [];
                        angular.forEach(customField.CustomFieldListOptions, function(value) {
                           var option = {}
                            option.CustomFieldValueId = value.CustomFieldValueId;
                            option.id = value.CustomFieldValueId;
                            option.Name = value.CustomFieldValueName;
                            option.CustomFieldValueOrder = value.CustomFieldValueOrder;
                            option.IsHidden = value.IsHidden;
                            option.IsShowHiddenOption = false;
                            allOptions.push(option);
                        });
                        input.activities = allOptions;
                    }
                    // Map custom field answers to custom field value
                    var answeredCustomField = $filter('filter')(customFieldAnswers, function (value) {
                        return value.CustomFieldGuid === customField.CustomFieldGuid;
                    });
                    var showCustomField = false;
                        if (answeredCustomField !== null && answeredCustomField !== undefined && answeredCustomField.length > 0) {
                            var answer = JSON.parse(answeredCustomField[0].FieldAnswer);
                            if (customField.CustomFieldType === 2) {
                                input.checked = answer;
                            } else if (customField.CustomFieldType === 5) {
                              input.Date = answer === "" ? "" : answer;
                            } else if (customField.CustomFieldType === 3 ) {// spliting it with multilist as objected is needed
                                input.activities = allOptions;
                                selectedOptions = [];
                                angular.forEach(answer, function (value) {
                                    var selectedOption = {}
                                    selectedOption.id = value.ValueId;
                                    selectedOption.Name = value.Name;
                                    selectedOptions.push(selectedOption);
                                });
                                input.select = selectedOptions[0];//getting object
                                if (input.select != null) {
                                    input.select.id = selectedOptions[0].id;
                                }
                                angular.forEach(input.activities, function (value) {
                                    var selectedHiddenOption = $filter('filter')(selectedOptions, function (option) {
                                        return value.id === option.id;
                                    });
                                    if (selectedHiddenOption !== null && selectedHiddenOption !== undefined && selectedHiddenOption.length > 0) {
                                        value.IsShowHiddenOption = true;
                                    }
                                });
                            }
                            if (customField.CustomFieldType === 4) {

                                input.activities = allOptions;
                                selectedOptions = [];
                                angular.forEach(answer, function (value) {
                                    var selectedOption = {}
                                    selectedOption.id = value.ValueId;
                                    selectedOption.Name = value.Name;
                                    selectedOptions.push(selectedOption);
                                });
                                input.select = selectedOptions;
                                input.selectedName = selectedOptions;
                                angular.forEach(input.activities, function (value) {
                                    var selectedHiddenOption = $filter('filter')(selectedOptions, function (option) {
                                        return value.id === option.id;
                                    });
                                    if (selectedHiddenOption !== null && selectedHiddenOption !== undefined && selectedHiddenOption.length > 0) {
                                        value.IsShowHiddenOption = true;
                                    }
                                });
                            }
                            else {
                                input.value = answer;
                            }
                            showCustomField = true;
                        }
                    if (input.activities != null && input.activities != undefined && input.activities.length > 0) {
                        var options = [];
                        angular.forEach(allOptions, function(value) {
                            var option = {}
                            option.CustomFieldValueId = value.CustomFieldValueId;
                            option.id = value.CustomFieldValueId;
                            option.Name = value.Name;
                            option.CustomFieldValueOrder = value.CustomFieldValueOrder;
                            option.IsHidden = value.IsHidden;
                            option.IsShowHiddenOption = false;
                            options.push(option);
                        });
                        angular.forEach(input.activities, function(optionValue) {
                            if (!optionValue.IsShowHiddenOption && optionValue.IsHidden) {
                                var indexHiddenItem = -1;
                                angular.forEach(options, function(value, index) {
                                    if (value.id === optionValue.id) {
                                        return indexHiddenItem = index;
                                    }
                                });
                                if (indexHiddenItem !== -1) {
                                    options.splice(indexHiddenItem, 1);
                                }
                            }
                        });
                        input.activities = options;
                    }
                    if (showCustomField) {
                        inputs.push(input);
                    } else if (!customField.IsHidden) {
                        inputs.push(input);
                    }
                    
                });
                return inputs;
            }
        }
    }]);