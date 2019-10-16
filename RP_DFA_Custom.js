//Function to apply validation Attribute Name and Value****** 13/10/2004****Start-Paddy
//Add a case to this function pertaining to ones Attribute name and add the functionality wise function call within it.
//
top.seq = "1";
var asIsId, onlyOnce = false,
    sequence = new Array;

function RP_validate_AllFunction(Attribute_Name, Attribute_Value, obj, displayValue) {
    displayValue = Attribute_Value;
    switch (Attribute_Name) {
	case "LocationId":
             {

                if (Attribute_Value.length >28) {
                     
					   //debugger;
					   if (sProdName == "A End Order Details")
					   {
					    var sPname = "A End Details";
					   } 
					   if(sProdName == "B End Order Details")
					   {
						var sPname = "B End Details";
					   }
						alert("Please ensure the location id  is less than  or equal to 28 characters for "+ sPname+".");
						
						
                        Attribute_Value = "";
                        setTimeout("blankField('" + obj.id + "');", 1);
                    
                }
            }
	break;
	
		default:
		break;
				
    }

    return Attribute_Value;
}

function blankField(id) {
    var control = document.getElementById(id);
    control.value = "";
}

// Function to trim leading zeroes and spaces
function LTrim(strTrim) {
    var iStart = 0;
    var len = strTrim.length;

    while (strTrim.charAt(iStart) == "0" || strTrim.charAt(iStart) == ' ') {
        iStart++;
    }
    return (strTrim.substring(iStart));

}

// Generic Function to Call Validation Function for attribure-Start **************

function RP_showTextBox_validation(grpItemId) {

    var spanObj = document.getElementById(grpItemId);
    var textBoxPropSet = m_UIFramework.m_controlPropSet.GetChildByType(grpItemId);
    var objType = textBoxPropSet.GetProperty("Object Type", objType);

    if (objType == "Attribute") {
        var innerHTML;
        var displayValue = textBoxPropSet.GetProperty("Value");
        var readOnly = textBoxPropSet.GetProperty("CxReadOnly");
        var attName = textBoxPropSet.GetProperty("AttName");
        var attValue = textBoxPropSet.GetProperty("AttValue");
        //var ProdName=sProdName;
        var readOnlyVal = "disabled";

        if (top.TRC == "TRC")
            var ProdName = sProdName;
        else
            var ProdName = textBoxPropSet.GetProperty(".ProdName");

        switch (top.DFA) {
            case 0:
                switch (attName) {
                    case "SeparateFromCircuitNumber":
                        top.OrigCN = attValue; // TCR 5159
                        top.CircuitNumber = attValue;
                        break;
                    case "SASReference":
                        top.SASRef = attValue;
                        break;
                    case "AuthorisedECC":
                        top.ECC_VAL_Current = attValue;
                        break;
					
                }
                break;
            default:
                if (attName == "SASReference")
                    top.SASRef = attValue;
                if (attName == "SeparateFromCircuitNumber")
                    top.CircuitNumber = attValue; // TCR 5159
                if (attName == "Slot" && (ProdName == "A End Details" || ProdName == "A End Order Details"))
                    top.SlotA = attValue;
                if (attName == "Slot" && (ProdName == "B End Details" || ProdName == "B End Order Details"))
                    top.SlotB = attValue;
                if (attName == "AuthorisedECC" && ProdName == "Excess Construction Charges") // Avinash 2700.4
                    top.ECC_VAL_Current = attValue;
				
                break;
        }
        //[Sampad][R3300.9]

        if (attName == "Suite" && ProdName == "B End Details") 
        {
            sProdName = "B End Order Details";
            top.flagB = 1;
        }

        if (attName == "Suite" && ProdName == "A End Details") 
        {
            sProdName = "A End Order Details";
            top.flagA = 1;
        }
		

        switch (top.flagA) {
            case 0:
                switch (attName) {
                    case "LLUCNumber":
                        top.CurrentLLUC = attValue; 
                        top.Prev_LLUC = attValue;
                        break;
                    case "LinkedOrderReference":
                        top.LornA = attValue;
                        break;
                }
                break; //case 0
            default:
                if (attName == "LLUCNumber")
                    top.CurrentLLUC = attValue;
                break;
        }

        switch (top.flagB) {
            case 0:
                switch (attName) {
                    case "LinkedOrderReference":
                        top.LornB = attValue;
                        break;
                }
                break;
            default:
                break;
        }

        switch (attName) {
		case "Floor":
                if (ProdName == "A End Details")
                    if (attValue == "" || attValue == null)
                        top.flagcheckA["Floor"] = "Y";
                    else
                        top.flagcheckA["Floor"] = "N";
                else
                if (attValue == "" || attValue == null)
                    top.flagcheckB["Floor"] = "Y";
                else
                    top.flagcheckB["Floor"] = "N";
                break;
				
		case "Room":
                if (ProdName == "A End Details")
                    if (attValue == "" || attValue == null)
                        top.flagcheckA["Room"] = "Y";
                    else
                        top.flagcheckA["Room"] = "N";
                else
                if (attValue == "" || attValue == null)
                    top.flagcheckB["Room"] = "Y";
                else
                    top.flagcheckB["Room"] = "N";
                break;		
            
            case "Rack":
                if (ProdName == "A End Details")
                    if (attValue == "" || attValue == null)
                        top.flagcheckA["Rack"] = "Y";
                    else
                        top.flagcheckA["Rack"] = "N";
                else
                if (attValue == "" || attValue == null)
                    top.flagcheckB["Rack"] = "Y";
                else
                    top.flagcheckB["Rack"] = "N";
                break;
            case "Suite":
                if (ProdName == "A End Details")
                    if (attValue == "" || attValue == null)
                        top.flagcheckA["Suite"] = "Y";
                    else
                        top.flagcheckA["Suite"] = "N";
                else
                if (attValue == "" || attValue == null)
                    top.flagcheckB["Suite"] = "Y";
                else
                    top.flagcheckB["Suite"] = "N";
                break;
            case "LLUCNumber":
                if (attValue == "" || attValue == null)
                    top.flagcheckA["LLUC Number"] = "Y";
                else
                    top.flagcheckA["LLUC Number"] = "N";
                break;
            case "LinkedOrderReference":
                if (ProdName == "A End Order Details") {
                    top.LornA = attValue;
                    if (attValue == "" || attValue == null)
                        top.flagcheckA["Linked Order Reference"] = "Y";
                    else
                        top.flagcheckA["Linked Order Reference"] = "N";
                } else {
                    top.LornB = attValue;
                    if (attValue == "" || attValue == null)
                        top.flagcheckB["Linked Order Reference"] = "Y";
                    else
                        top.flagcheckB["Linked Order Reference"] = "N";
                }
                break;
            case "CircuitNoOfExistingFibreDeliveredService":
                if (ProdName == "A End Order Details")
                    if (attValue == "" || attValue == null)
                        top.flagcheckA["Circuit number of the existing fibre delivered service"] = "Y";
                    else
                        top.flagcheckA["Circuit number of the existing fibre delivered service"] = "N";
                else
                if (attValue == "" || attValue == null)
                    top.flagcheckB["Circuit number of the existing fibre delivered service"] = "Y";
                else
                    top.flagcheckB["Circuit number of the existing fibre delivered service"] = "N";
                break;
            
			case "LandlordName":
				 if (ProdName == "A End Order Details")
				 {
					top.PSLandNameA = attValue;
				 }
				 else if(ProdName == "B End Order Details")
				 {
					top.PSLandNameB = attValue;
				 }
			 break;
			 case "LandlordContactNumber":
				 if (ProdName == "A End Order Details")
				 {
					top.PSLandNoA = attValue;
				 }
				 else if(ProdName == "B End Order Details")
				 {
					top.PSLandNoB = attValue;
				 }
			 break;
			 
        }

        if (attName == "SASReference")
            top.DFA = 1;

        // JS Refactor Starts
        if (top.Amend == "")
            var EADRO = textBoxPropSet.GetProperty(".EADQuoteRO");

        else
            var EADRO = textBoxPropSet.GetProperty(".DFA_" + top.Amend); //Rishabh  4200

        if (EADRO != "" && EADRO != undefined) {

            var ReadonlyFlag = ROFalg(EADRO);
            if (ReadonlyFlag == "Y")
                readOnlyVal = "";
        } else {
            readOnlyVal = "disabled";

        }
        //avinash 2700.4
        // Condition Based Readonly 

        if (readOnlyVal == "") {
            switch (attName) {
                //sampad
                case "SeparateFromCircuitNumber":
					if (top.Resilience == "Standard") 
					{
                        readOnlyVal = "disabled";
                    }
                    break;
				
				case "SASReference": //[Nikhil][3450.1][ORCE-101827]
					//alert("top.Migration: "+top.Migration);
					if (top.Migration == "Y") 
					{
                        readOnlyVal = "disabled";
                    }
                break;	
					
					case "Landmark": //[Sampad][R3300.9]
					if((ProdName == "A End Details" && top.LocationTypeA == "Building") || (ProdName == "B End Details" && top.LocationTypeB == "Building"))
					{
                      readOnlyVal = "disabled";	
					} 
					  break;
				//Zahurullah/3400.2
				//Zahurullah[QC#94461]Priyanka[QC#75496][3500.6.1]
				case "LocationId":
					if ((ProdName == "A End Details" && top.ModifyType == "ShiftA") || (ProdName =="A End Details" && top.LocIdenA == "EXISTING SERVICE ID"))
                        readOnlyVal = "disabled";
                    if ((ProdName == "B End Details" && top.ModifyType == "ShiftB" ) || (ProdName =="B End Details" && top.LocIdenB == "EXISTING SERVICE ID"))
                        readOnlyVal = "disabled";
					break;
				case "Rack":
				case "Suite":
				case "Room":
				case "Floor":
				case "LLUCNumber":
				case "Position":
					if(ProdName =="A End Details" && top.LocIdenA == "EXISTING SERVICE ID")
						readOnlyVal = "disabled";
					if(ProdName =="B End Details" && top.LocIdenB == "EXISTING SERVICE ID")
						readOnlyVal = "disabled";
					break;
					
                default:
				break;
            }
        } //readOnly
        //JS Refactor Ends

        if (readOnly == "Y" || readOnlyVal == "disabled")
            innerHTML = displayValue;
       
			
			else {
                innerHTML = "<input type=\"text\" " +

                    "value=\"" + displayValue + "\" " +

                    "id=\"GRPITEM" + _pipe + grpItemId +

                    _underscore + "ATTTYPE" + _pipe + "TEXT" +

                    "\"" + " onchange='this.value=removeSpecialChar(this.value);processInput(\"GRPITEM" + _pipe + grpItemId +

                    _underscore + "ATTTYPE" + _pipe + "TEXT" +

                    "\", \"\", \"text\")'" + readOnlyVal + " />";
            
        }

        if (textBoxPropSet.GetProperty("EditField") == "Y") {
            var attId = textBoxPropSet.GetProperty("AttID");

            innerHTML += "<a href='javascript:m_UIFramework.EditField(\"" + grpItemId + "\", \"Attribute\", \"\", \"\")' />" +
                m_UIFramework.editFieldIcon +
                "</a>";
        }
        spanObj.innerHTML = innerHTML;
    }
}
// Generic Function to Call Validation Function for attribure-End  **************

//Function 'customValidate' Called from 'showTextBox_validation' **** 
function RP_customValidate(AttributeName, Attributevalue, obj, _pipe, grpItemId, _underscore, displayValue) {

    if (RP_validate_AllFunction(AttributeName, Attributevalue, obj, displayValue) == "") {
        var thisId = "GRPITEM" + _pipe + grpItemId + _underscore + "ATTTYPE" + _pipe + "TEXT";
        document.getElementById(thisId).value = "";
    }
    var processInputText = "processInput(\"GRPITEM" + _pipe + grpItemId + _underscore + "ATTTYPE" + _pipe + "TEXT" + "\", \"\", \"text\")"
    eval(processInputText);
}
//Function 'customValidate' Called from 'showTextBox_validation' **** 


function showCheckBoxEAD(grpItemId) {
    showDomainAndChildrenControlEAD(grpItemId, "checkbox");
}

function showDomainAndChildrenControlEAD(grpItemId, controlType) {
    var noneSelected = "Y";
    var portItemId = "";
    var rowType = _underscore + "PROD" + _pipe;
    var tableObj;
    var tr;
    var td;
    var i, j, nDomainLen;

    spanObj = document.getElementById("SPAN_" + grpItemId);
    spanObj.innerHTML = "<table id=\"" + grpItemId + "\"></table>";

    tableObj = document.getElementById(grpItemId);

    var resultPropSet = m_UIFramework.m_controlPropSet.GetChildByType(grpItemId);
    var portPropSet = resultPropSet.GetChildByType("Domain");
    var fieldListPropSet = new JSSCfgPropertySet();
    var strFieldList = resultPropSet.GetProperty("FieldList");
    fieldListPropSet.DecodeFromString(strFieldList);
    nDomainLen = portPropSet.GetChildCount();

    //Insert the field header
    tr = tableObj.insertRow(-1);
    if (controlType != "quantity") {
        td = tr.insertCell(-1);
        td.innerHTML = m_UIFramework.whiteImage;
    }
    displayFieldHeader(tr, fieldListPropSet);

    if (controlType == "radio") {
        //Add a slot for "none" option
        //I'm only adding the row here.
        //The contents of the row is contructed after the for loop below.
        //The reason is so that we know whether or not to check the "none"
        //I could also do "tableObj.insertRow (0) at the end, but according to MSDN, this is
        //more expensive
        tr = tableObj.insertRow(-1);
        portItemId = portPropSet.GetProperty("Port Item Id");
        strRowId = grpItemId + rowType + "none";
        tr.id = strRowId;
    }

    for (i = 0; i < nDomainLen; i++) {
        var className = "";
        var displayName = "";
        var DispStyle = "";
        var enable = "";
        var hasGeneric = "";
        var excluded = "";
        var innerHTML = "";
        var isChecked = "";
        var quantity = "";
        var path = "";
        var prodId = "";
        var selected = "";
        var strRowId = "";
        var strSpanId = "";

        //Default values for the Display Style
        if (controlType == "checkbox" ||
            controlType == "quantity")
            DispStyle = 'eCfgSpanAvailable';
        else if (controlType == "radio")
            DispStyle = 'eCfgRadioAvailable';

        //These are the possible "default" values that we need to show a port domain/item
        portDomainPropSet = portPropSet.GetChild(i);
        excluded = portDomainPropSet.GetProperty("Excluded");
        prodId = portDomainPropSet.GetProperty("Product Id");
        portItemId = portDomainPropSet.GetProperty("Port Item Id");
        displayName = portDomainPropSet.GetProperty("CxObjName");
        enable = portDomainPropSet.GetProperty("CxEnabled");
        selected = portDomainPropSet.GetProperty("Selected");
        quantity = portDomainPropSet.GetProperty("Quantity");
        hasGeneric = portDomainPropSet.GetProperty("RequireMoreChild");
        //isComplex = portDomainPropSet.GetProperty ("IsComplexProduct");           
        if (isNaN(quantity))
            quantity = "";
        path = portDomainPropSet.GetProperty("Path");

        tr = tableObj.insertRow(-1);
        strRowId = grpItemId + _underscore + "PROD" + _pipe + prodId;
        tr.id = strRowId;
        if (excluded == "Y" && enable == "N")
            tr.style.display = "none";

        if (selected == "Y") {
            if (controlType == "checkbox" ||
                controlType == "quantity")
                DispStyle = 'eCfgSpanSelected';
            else if (controlType == "radio") {
                DispStyle = 'eCfgRadioSelected';
                noneSelected = "N";
            }
        } else {
            if (enable == "N") {
                if (controlType == "checkbox" ||
                    controlType == "quantity")
                    DispStyle = 'eCfgSpanExcluded';
                else if (controlType == "radio")
                    DispStyle = 'eCfgRadioExcluded';
            }
        }

        //1. Display the first column for this control
        //   If it's a radio button: display radio button
        //   If it's a quantity list: display a quantity box
        //   If it's a checkbox: display a checkbox
        td = tr.insertCell(-1);
        if (controlType == "quantity") {
            td.id = strRowId + _underscore + "FIELD" + _pipe + "Quantity";
            addHtmlAttrib(fieldListPropSet, "Quantity", td);

            innerHTML = innerHTML +
                "<input type=\"text\"" + " id=" + td.id + "_INPUT" + " TABINDEX=\"99\"" + " STYLE=\"width:3.75em\"" + " value=\"" + quantity +
                "\" onchange='processInput(\"GRPITEM" + _pipe + grpItemId + _underscore + "PROD" + _pipe +
                prodId + "\", \"\", \"text\")'>" +
                "</input>";
        } else if (controlType == "checkbox" ||
            controlType == "radio") {
            if (selected == "Y")
                isChecked = " checked>";
            else
                isChecked = ">";
            var readOnlyVal = "disabled";
            td.id = strRowId + _underscore + "FIELD" + _pipe + "Quantity";

        }




        td.innerHTML = innerHTML;

        //2. Display the second column in this control.
        //   For all types of controls, this would be the name of the product.     
        td = tr.insertCell(-1);
        addHtmlAttrib(fieldListPropSet, "Name", td);

        strSpanId = grpItemId + _underscore + "PORTDOMAIN" + _pipe + prodId;
        innerHTML = "<span id=\"" + strSpanId + "\" class=\"" + DispStyle + "\">";

        if (selected == "Y" && portDomainPropSet.GetProperty("CanDrillDown") == "Y")
            innerHTML += "</a>";
        innerHTML += "</span>";

        td.innerHTML = innerHTML;
        addGenerics(resultPropSet, td, path, hasGeneric);

        //3. Display the field list
        displayFieldList(tr, rowType, resultPropSet.GetType(), fieldListPropSet, portDomainPropSet, false);
    }

    if (controlType == "radio") {
        //Add none option
        portItemId = portPropSet.GetProperty("Port Item Id");
        strRowId = grpItemId + rowType + "none";
        tr = document.getElementById(strRowId);


        if (tr != null || bCFG_uiJsDebug) {
            td = tr.insertCell(-1);
            td.id = strRowId + _underscore + "FIELD" + _pipe + "Quantity";

            if (noneSelected == "Y")
                isChecked = " checked>";
            else
                isChecked = " >";

            innerHTML = "<input type=\"" + controlType +
                "\" name=\"GRPITEM" + _pipe + grpItemId + _underscore + "DOMAIN\"" +
                " onclick='processInput(\"GRPITEM" + _pipe + grpItemId + _underscore + "PROD" + _pipe +
                "none" + "\", \"\", \"" +
                controlType + "\")'" + isChecked +
                "</input>";
            td.innerHTML = innerHTML;

            td = tr.insertCell(-1);
            addHtmlAttrib(fieldListPropSet, "Name", td);
            td.innerHTML = "None";
        }
    }
}

/* Custom Stuff */
function showCheckBoxChild(grpItemId) {
    showDomainAndChildrenControlChild(grpItemId, "checkbox");
}

function showComboEAD(grpItemId) {

    var dispStyle = "";
    //var ProdName=sProdName;
    var Parent_Porduct = sParentProd;
    //debugger;
    //alert("Parent_Porduct"+Parent_Porduct+".");
    var displayValue = "";
    var enabled = "";
    var nDomainLen = 0;
    var selectId = "select_" + grpItemId;
    var selectedIndex = -1;
    var selectedTag = "";
    var selectedTagflag = "";
    var selectOptionHTML = "";
    var spanId = "";
    var tr = null;
    var td = null;
    var id = grpItemId + _underscore + "DOMAINSELECT";
    var comboPropSet = m_UIFramework.m_controlPropSet.GetChildByType(grpItemId);
    var objType = comboPropSet.GetProperty("Object Type", objType);
    var fieldListPropSet = new JSSCfgPropertySet();
    var strFieldList = comboPropSet.GetProperty("FieldList");
    fieldListPropSet.DecodeFromString(strFieldList);

    var attName = comboPropSet.GetProperty("AttName");
    var selectedAtt = comboPropSet.GetProperty("AttValue");

    if (top.TRC == "TRC") // avinash 2700.4 removed ecchargeband
        var ProdName = sProdName;
    else {

        var ProdName = comboPropSet.GetProperty(".ProdName");
        //alert("elseProdName:"+ProdName+".");
    }
    

    if (attName == "OOHPreference" && (top.count < top.Site)) {
        if (selectedAtt == "Yes") {
            top.OOH++;
            top.count++;
        }
        if (selectedAtt == "No") {
            top.count++;
        }
    }
    switch (top.DFA) {
        case 0:
            switch (attName) {
			
				case "ResilienceOption":
                    top.OrigRes = selectedAtt; // TCR 5159
                    top.Resilience = selectedAtt;
                    break;
                case "ContractTerm":
                    top.ContTerm = selectedAtt;
                    top.OrigCon = selectedAtt;
                    break; //Abhijit [Qc# 35113]
                    /*	case "ECChargeBand":		Aviansh 2700.4
                    			top.ECC_VAL_Current = selectedAtt;   
                    		break;   */
                case "Bandwidth":
                    top.Band = selectedAtt;
                    break;
                case "Reach":
                    {
                        top.ReachAmend = selectedAtt;
                        break;
                    }
                case "ResilienceViolationConfirmation":
                    top.RVC = selectedAtt;
                    break;
                case "ServiceDeliveryChargeAccepted": //[Rg0069876][ORCE-34981]
                    top.SDCA = selectedAtt;
                    break;
                case "User-LLFEnabled": //[SAGAR] [1900.7][QC 5301]
                    top.LLFEnabled = selectedAtt;
                    break;
                case "User-LLFEnabledDirection": // [SAGAR] [1900.7][QC 5301]
                    top.LLFEnabledDir = selectedAtt;
                    break;
                case "LocationType":
                    top.LocationType = selectedAtt;
                    break;
					
				case "FibreOption":   // [Satyam][QC#77207][R3500.8.3]
                    top.FibreOption = selectedAtt;
                    break;
                default:
                    break;
            }
            break;
        default:
            switch (attName) {
                case "NTEChassisOption":
                    if (ProdName == "A End Details")
                        top.NTEA = selectedAtt;
                    else
                        top.NTEB = selectedAtt;
                    break; //1900.2  Rahul
                case "Autonegotiate":
                    if (ProdName == "A End Details")
                        top.AutonegA = selectedAtt;
                    else
                        top.AutonegB = selectedAtt;
                    break;
                case "InterfaceType":
                    if (ProdName == "A End Details")
                        top.IntA = selectedAtt;
                    else
                        top.IntB = selectedAtt;
                    break;
                case "TRChargeBand":
                    top.TRC_OOH = selectedAtt;
                    break;
                    /*		case "ECChargeBand":   Avinash 2700.4
                    				top.ECC_VAL_Current = selectedAtt; 
                    			break;   */
                case "Housing":
                    if (ProdName == "A End Details")
                        top.HousingA = selectedAtt;
                    else
                        top.HousingB = selectedAtt;
                    break;
                case "ResilienceViolationConfirmation":
                    top.RVC = selectedAtt;
                    break;
				case "FibreOption":      // [Satyam][QC#77207][R3500.8.3]
                    top.FibreOption = selectedAtt;
                    break;
                case "ServiceDeliveryChargeAccepted": //[Rg0069876][ORCE-34981]
                    top.SDCA = selectedAtt;
                    break;
                case "Bandwidth":
                    top.Band = selectedAtt;
                    break;
                case "EnableSynchronisation": //SyncE_OR-5351_1900.7_Vaibhav
                    top.EnableSync = selectedAtt;
                    break;
                case "SynchronisationOption":
                    if (ProdName == "A End Details")
                        top.syncOptA = selectedAtt;
                    else
                        top.syncOptB = selectedAtt;
                    break;
                case "LocalTimingSource":
                    if (ProdName == "A End Order Details") // SyncE_OR-7909_2000.7_Jawahar
                        top.LTSA = selectedAtt;
                    else
                        top.LTSB = selectedAtt;
                    break;
                case "RemoteTimingSource":
                    if (ProdName == "A End Order Details")
                        top.RTSA = selectedAtt;
                    else
                        top.RTSB = selectedAtt;
                    break;
                case "Reach":
                    top.ReachAmend = selectedAtt;
                    break;
                case "13AmpDoubleSocketWithin1Metre": //Pavan 1900.12
                    if (ProdName == "A End Order Details")
                        top.PS13AmpA = selectedAtt;
                    else
                        top.PS13AmpB = selectedAtt;
                    break;
                case "TelephoneWithin3Metres": //Pavan 1900.12
                    if (ProdName == "A End Order Details")
                        top.PSTelepA = selectedAtt;
                    else
                        top.PSTelepB = selectedAtt;
                    break;
                case "FibreServiceInSameAEndLoc": //Pavan 1900.12			
                    top.PSFibrA = selectedAtt;
                    break;
                case "FibreServiceInSameBEndLoc": //Pavan 1900.12
                    top.PSFibrB = selectedAtt;
                    break;
                case "ResilienceOption": //Rahul 1900.8
                    top.OrigRes = selectedAtt;
                    top.Resilience = selectedAtt;
                    break;
                case "ThirdPartyAccessRequired":
                    if (ProdName == "A End Order Details")
                        top.PSThirA = selectedAtt;
                    else
                        top.PSThirB = selectedAtt;
                    break;
                case "LandlordsConsentNecessary": //Pavan 1900.12		
                    if (sProdName == "A End Order Details")
					{
                        top.PSLandNA = selectedAtt;
						if(top.PSLandNA == "Please select")
						{
							top.PSLandA ="";
							top.PSLandNameA ="";
							top.PSLandNoA ="";
						}
					}	
                    else
					{
						top.PSLandNB = selectedAtt;
						if(top.PSLandNB == "Please select")
						{
							top.PSLandB ="";
							top.PSLandNameB ="";
							top.PSLandNoB ="";
						}
					}	
                    break;
					
                case "LocationType": //Sampad[R3300.6][Defect]
					//debugger;
					if(top.TRC == "")
					{
						if (ProdName == "A End Details")
						{
							top.LocationTypeA = selectedAtt;
						}
						else if (ProdName == "B End Details")
						{
							top.LocationTypeB = selectedAtt;
						}
					}
                    break;
					

                case "LandlordsConsentGranted": //Pooja 2100.11
                    if (sProdName == "A End Order Details")
					{
                        top.PSLandA = selectedAtt;
						if(top.PSLandA == "Please select")
						{
							
							top.PSLandNameA ="";
							top.PSLandNoA ="";
						}
					}	
                    else
					{
						top.PSLandB = selectedAtt;
						if(top.PSLandB == "Please select")
						{
							
							top.PSLandNameB ="";
							top.PSLandNoB ="";
						}
					}	

                    break;
            }
            break;
    }

    switch (attName) {
	
	
		case "SiteType":		//[Sanidhya][R3450.1][DFA Modify]
		if(ProdName == "A End Details")
			top.SiteA = selectedAtt;
		else if(ProdName == "B End Details" )
			top.SiteB = selectedAtt;
		break;
        
        case "LocationType":

			if (ProdName == "A End Details" && top.LocationTypeA == "Building" )
			{
				top.MandAttrA["Floor"] = null;
				top.MandAttrA["Room"] = null;
				top.MandAttrA["Suite"] = null;
				top.MandAttrA["Rack"] = null;
				if (top.SiteA == "BT")
				{
					top.MandAttrA["Floor"] = "Floor";
					top.MandAttrA["Room"] = "Room";
					top.MandAttrA["Suite"] = "Suite";
					top.MandAttrA["Rack"] = "Rack";
				}
				else
				{
					top.MandAttrA["Floor"] = "Floor";
					top.MandAttrA["Room"] = "Room";
				}
			}
			else if (ProdName == "B End Details" && top.LocationTypeB == "Building" )
			{
				top.MandAttrB["Floor"] = null;
				top.MandAttrB["Room"] = null;
				top.MandAttrB["Suite"] = null;
				top.MandAttrB["Rack"] = null;
				if (top.SiteB == "BT")
				{
					top.MandAttrB["Floor"] = "Floor";
					top.MandAttrB["Room"] = "Room";
					top.MandAttrB["Suite"] = "Suite";
					top.MandAttrB["Rack"] = "Rack";
				}
				else
				{
					top.MandAttrB["Floor"] = "Floor";
					top.MandAttrB["Room"] = "Room";
				}
			}
			else 
			{
				if(ProdName == "A End Details")
				{
					top.MandAttrA["Floor"] = null;
					top.MandAttrA["Room"] = null;
					top.MandAttrA["Suite"] = null;
					top.MandAttrA["Rack"] = null;
				}
				else if(ProdName == "B End Details")
				{
					top.MandAttrB["Floor"] = null;
					top.MandAttrB["Room"] = null;
					top.MandAttrB["Suite"] = null;
					top.MandAttrB["Rack"] = null;
				}
			}
		
         
            break;


        case "LandlordsConsentNecessary":
            if (ProdName == "A End Order Details")
                if (selectedAtt == "Yes") {
                    top.MandAttrA["Landlord name"] = "Landlord name";
                    top.MandAttrA["Landlord contact number"] = "Landlord contact number";
                    top.MandAttrA["Has Landlord consent been granted for A end?"] = "Has Landlord consent been granted for A end?";
                } else {
                    top.MandAttrA["Landlord name"] = null;
                    top.MandAttrA["Landlord contact number"] = null;
                    top.MandAttrA["Has Landlord consent been granted for A end?"] = null;
                }
            else
            if (selectedAtt == "Yes") {
                top.MandAttrB["Landlord name"] = "Landlord name";
                top.MandAttrB["Landlord contact number"] = "Landlord contact number";
                top.MandAttrB["Has Landlord consent been granted for B end?"] = "Has Landlord consent been granted for B end?";
            } else {
                top.MandAttrB["Landlord name"] = null;
                top.MandAttrB["Has Landlord consent been granted for B end?"] = null;
                top.MandAttrB["Landlord contact number"] = null;
            }
            break;
            
        case "LandlordsConsentGranted":
            if (ProdName == "A End Order Details")
                if (selectedAtt == "No") {
                    top.MandAttrA["Landlord name"] = null;
                    top.MandAttrA["Landlord contact number"] = null;
                    top.flagcheckA["Has Landlord consent been granted for A end?"] = "N";
                } else
                    top.flagcheckA["Has Landlord consent been granted for A end?"] = "N";
            else if (selectedAtt == "No") {
                top.MandAttrB["Landlord name"] = null;
                top.MandAttrB["Landlord contact number"] = null;
                top.flagcheckB["Has Landlord consent been granted for B end?"] = "N";
            } else
                top.flagcheckB["Has Landlord consent been granted for B end?"] = "N";
            break;
    }

    if (attName == "ResilienceViolationConfirmation")
        top.DFA = 1;




    var spanObj = document.getElementById("SPAN_" + grpItemId);
    spanObj.innerHTML = "<table id=\"" + grpItemId + "\"></table>";

    tableObj = document.getElementById(grpItemId);

    if (objType == "Port") {
        var portId = (comboPropSet.GetChildByType("Domain")).GetProperty("Port Item Id");
        var noneId = grpItemId + _underscore + "PORTDOMAIN" + _pipe + "none";
        var portPropSet = comboPropSet.GetChildByType("Domain");
        nDomainLen = portPropSet.GetChildCount();

        //1.Insert the combo box control

        //Insert the field header
        tr = tableObj.insertRow(-1);
        displayFieldHeader(tr, fieldListPropSet);

        tr = tableObj.insertRow(-1);
        tr.id = grpItemId + _underscore + "COMBOBOX";
        td = tr.insertCell(-1);
        td.id = grpItemId + _underscore + "COMBOBOX_TD";
        addHtmlAttrib(fieldListPropSet, "Name", td);

        selectOptionHTML = "<select id=\"" + id + "\" onchange='processInput(\"" + id +
            "\", \"\", \"select\")' " + ">" +
            //Add an empty option        
            "<option value=" + "\"" + "GRPITEM" + _pipe + grpItemId + _underscore + "PROD" + _pipe + "none" +
            "\" id =\"" + noneId + "\" class=\"" + "eCfgOptionAvailable" + "\" >" + "" + "</option>";

        for (var i = 0; i < nDomainLen; i++) {
            var excluded = "";
            var portDomainPropSet = portPropSet.GetChild(i);
            var portId = "";
            var prodId = "";
            var selected = "";

            excluded = portDomainPropSet.GetProperty("Excluded");
            displayValue = portDomainPropSet.GetProperty("CxObjName");
            selected = portDomainPropSet.GetProperty("Selected");
            enabled = portDomainPropSet.GetProperty("CxEnabled");
            prodId = portDomainPropSet.GetProperty("Product Id");
            portId = portDomainPropSet.GetProperty("Port Item Id");
            if (selected == "Y") {
                selectedTag = " selected";
                selectedIndex = i;
                dispStyle = "eCfgOptionAvailable";
            } else {
                selectedTag = "";
                if (enabled == "Y")
                    dispStyle = "eCfgOptionAvailable";
                else
                    dispStyle = "eCfgOptionExcluded";
            }

            if (excluded != "Y" || enabled == "Y") {
                spanId = grpItemId + _underscore + "PORTDOMAIN" + _pipe + prodId;
                selectOptionHTML = selectOptionHTML +
                    "<option id=\"" + spanId + "\" value=" + "\"" + "GRPITEM" + _pipe + grpItemId +
                    _underscore + "PROD" + _pipe + prodId +
                    "\" class=\"" + dispStyle + "\" " + selectedTag + ">" + displayValue + "</option>";
            }
        }

        selectOptionHTML += "</select>";
        td.innerHTML = selectOptionHTML;

        //3. Display Red Star and field lists

        if (selectedIndex != -1) {
            portDomainPropSet = portPropSet.GetChild(selectedIndex);
            var hasGeneric = portDomainPropSet.GetProperty("RequireMoreChild");
            var path = portDomainPropSet.GetProperty("Path");

            addGenerics(comboPropSet, td, path, hasGeneric);
            displayQtyInCombo(tr, comboPropSet.GetType(), fieldListPropSet, portDomainPropSet);
            displayFieldList(tr, _underscore + "PROD" + _pipe, comboPropSet.GetType(), fieldListPropSet, portDomainPropSet, "N");
        } else {
            addGenerics(comboPropSet, td, path, "N");
            displayQtyInCombo(tr, comboPropSet.GetType(), fieldListPropSet, null);
            displayFieldList(tr, _underscore + "PROD" + _pipe, comboPropSet.GetType(), fieldListPropSet, null, "N");
        }
    } else if (objType == "Attribute") {
        var readOnlyVal = "disabled";
        var spanId = "";

        var attType = comboPropSet.GetProperty("AttType");
        var attId = comboPropSet.GetProperty("XA Id");
        var selectedAtt = comboPropSet.GetProperty("AttValue"); //database value 1
        var readOnly = comboPropSet.GetProperty("CxReadOnly");
        var attPropSet = comboPropSet.GetChildByType("Domain");
        var attName = comboPropSet.GetProperty("AttName");
        nDomainLen = attPropSet.GetChildCount();

        tr = tableObj.insertRow(-1);
        tr.id = grpItemId + _underscore + "COMBOBOX";
        td = tr.insertCell(-1);
        td.id = grpItemId + _underscore + "COMBOBOX_TD";
        top.svr_act;
        top.PONA;
        if (attName == "SiteVisitReason" || attName == "ActivityType") {
            top.svr_act = selectedAtt;
        }

        // JS Refactor Starts
        // Journey Based Readonly 

        if (top.Amend == "")
            var EADRO = comboPropSet.GetProperty(".EADQuoteRO");
        else {
            var EADRO = comboPropSet.GetProperty(".DFA_" + top.Amend); //Rishabh  
            /*	var EADROExt = "";
            	var EADROExt1 = "";
            	var EADROExt2 = "";
            	var EADROExt3 = "";
            	 EADROExt = comboPropSet.GetProperty (".EADOrderRO1");
            	 EADROExt1 = comboPropSet.GetProperty (".EADOrderRO2");  //2400.1 Property extended for OOHP
            	 EADROExt2 = comboPropSet.GetProperty (".EADOrderRO3"); 
            	 EADROExt3 = comboPropSet.GetProperty (".EADOrderRO4");
            	if(EADROExt != "" && EADROExt != undefined)
            	{
            		EADRO = EADRO+EADROExt+EADROExt1+EADROExt2+EADROExt3;
            	} */
        }

        if (EADRO != "" && EADRO != undefined) {
            var ReadonlyFlag = ROFalg(EADRO);
            if (ReadonlyFlag == "Y")
                readOnlyVal = "";
            //alert("ReadonlyFlag: " + ReadonlyFlag + "AttrName :" + attName + ".");
        } else {
            //alert("AttName:"+ attName +" ReadonlyFlag:"+ReadonlyFlag+".");
            if (attName == "RemoteTimingSource" && top.Band == "10Gbit/s" && (top.Amend != "" && top.Amend != null) && (top.Reason != "" && top.Reason != null && (top.Type != "MSF" && top.Type != "ShiftA" && top.Type != "ShiftB")) && top.syncOptA == "Sync Output" && ProdName == "A End Order Details") {
                readOnlyVal = "enabled"; //Sanidhya 2900.5.1
            } else if (attName == "RemoteTimingSource" && top.Band == "10Gbit/s" && (top.Amend != "" && top.Amend != null) && (top.Reason != "" && top.Reason != null) && top.syncOptB == "Sync Output" && ProdName == "B End Order Details" && (top.Type != "MSF" && top.Type != "ShiftA" && top.Type != "ShiftB")) {
                readOnlyVal = "enabled";
            } 
			else if ((attName == "FibreOption") && ((top.Amend == "" || top.Amend == undefined) || top.Amend == "BT"))  //[Satyam][QC#77207][R3500.8.2]
			{	
				readOnlyVal = "enabled";
 
			}
			
			else if (attName == "ResilienceViolationConfirmation" && top.Amend == "MRV")
			readOnlyVal = "";
			
            else
                readOnlyVal = "disabled"; //avinash 2700.4
        }
        // Condition Based Readonly

        if (readOnlyVal == "") {
            switch (attName) {
							
				case "Housing": //Zahurullah[QC#94461][3550.8]Priyanka[QC#75496][3500.6.1]
				  if (ProdName == "A End Details" && top.LocIdenA == "EXISTING SERVICE ID")
                        readOnlyVal = "disabled";
                    if (ProdName == "B End Details" && top.LocIdenB == "EXISTING SERVICE ID")
                        readOnlyVal = "disabled";
                    break;
				case "LocationType":
                    if ((ProdName == "A End Details" && top.LocIdenA == "EXISTING SERVICE ID") || top.ModifyType == "ShiftA")
                        readOnlyVal = "disabled";
                    if ((ProdName == "B End Details" && top.LocIdenB == "EXISTING SERVICE ID") || top.ModifyType == "ShiftB")
                        readOnlyVal = "disabled";
                    break;
				case "LocationId":		//[Sanidhya][R3450.1.1][DFA Modify]
                    if (ProdName == "A End Details" && top.ModifyType == "ShiftA")
                        readOnlyVal = "disabled";
                    if (ProdName == "B End Details" && top.ModifyType == "ShiftB")
                        readOnlyVal = "disabled";
					break;
                case "ContractTerm":
                    readOnlyVal = "disabled";
                    break;
                case "Autonegotiate":
                    if (top.Band == "1000Mbit/s")
                        readOnlyVal = "disabled";
                    break;
				case "FibreOption":		//[Sanidhya][R3450.1][DFA Modify] //[Satyam][QC#77207][R3500.8.2]
					if(top.ModifyQuotation == "EAD" || top.ModifyQuotation == "Aend" || top.ModifyQuotation == "Bend" || top.MigrationOrder == "Y")  
						readOnlyVal = "disabled";
					break;
                case "SynchronisationOption":
                    if (top.Modify == "EAD" || top.Type == "MSF" || top.Type == "BP") //modify,amend on provide & amend on modify
                    {
                        if (ProdName == "A End Details") {
                            if (selectedAtt == "Not Required")
                                readOnlyVal = "disabled";
                            else if (top.Type != "BP")
                                if (top.Prev_EnableSync == "YES")
                                    readOnlyVal = "disabled";
                        } else if (ProdName == "B End Details") {
                            if (selectedAtt == "Not Required" || (selectedAtt == "Sync Output" && top.Type == "MSF" && top.InterStatus == "ACKNOWLEDGED") || (selectedAtt == "Sync Output" && top.Modify == "EAD"))
                                readOnlyVal = "disabled";
                            else if (top.Type != "BP")
                                if (top.Prev_EnableSync == "YES")
                                    readOnlyVal = "disabled";
                        }
                    } else if (top.Amend == "" && top.Modify == "") //provide
                    {
                        if (ProdName == "A End Details") {
                            if (selectedAtt == "Not Required")
                                readOnlyVal = "disabled";
                        } else if (ProdName == "B End Details") {
                            if (selectedAtt == "Not Required" || selectedAtt == "Sync Output")
                                readOnlyVal = "disabled";
                        }
                    } //provide
                    break;
                    /*case "NTEChassisOption":
                    	if(top.Modify=="Aend")
                    	{
                    		if(top.syncOptA != "" && top.EnableSync == "Yes")   //[Sandhya][2800.7][OR9814_additional]
                    			readOnlyVal = "disabled";
                    	}
                    	else if(top.Modify=="Bend")
                    	{
                    		if(top.syncOptB != "" && top.EnableSync == "Yes")     //[Sandhya][2800.7][OR9814_additional]
                    			readOnlyVal = "disabled";
                    	}
                    	else if(top.Amend!="" || top.Modify == "EAD")
                    	{	if(top.EnableSync == "Yes")
                    			readOnlyVal = "disabled";
                    	}
                    	if(ProdName =="A End Details" && top.LocIdenA == "EXISTING SERVICE ID")
                    			readOnlyVal = "disabled";
                    	if(ProdName =="B End Details" && top.LocIdenB == "EXISTING SERVICE ID")
                    			readOnlyVal = "disabled";
                    break;*/
                case "InterfaceType":
                    if ((top.Type == "MSF" || top.Modify == "EAD") && top.Prev_Band == top.Band)
                        readOnlyVal = "disabled";
                    break;
                case "EnableSynchronisation":
                    if (top.Band == "10Mbit/s")
                        readOnlyVal = "disabled";
                    if (top.Prev_EnableSync == "YES" && top.Modify == "EAD")
                        readOnlyVal = "disabled";
                    break;
                case "LocalTimingSource":
                    if (top.Type != "ShiftA") {
                        if (ProdName == "B End Order Details") {
                            if ((selectedAtt == "Not Required" && top.EnableSync == "No") || (selectedAtt == "Not Required" && top.EnableSync == "Yes" && top.syncOptB == "BITS SSM") || (selectedAtt == "Not Required" && top.EnableSync == "Yes" && top.syncOptB == "Sync Output")) // making the defaulting rules to work 	on load event
                            {
                                readOnlyVal = "disabled";
                                if (top.Modify == "EAD" || top.Type == "MSF")
                                    if (top.Prev_EnableSync == "YES")
                                        readOnlyVal = "disabled";
                            }
                        } //B end Order Details
                    }
                    if (top.Type != "ShiftB") {
                        if (ProdName == "A End Order Details") {
                            if ((selectedAtt == "Not Required" && top.EnableSync == "No") || (selectedAtt == "Not Required" && top.EnableSync == "Yes" && top.syncOptA == "BITS SSM")) // making the defaulting rules to work on load event
                            {
                                readOnlyVal = "disabled";
                                if (top.Modify == "EAD" || top.Type == "MSF")
                                    if (top.Prev_EnableSync == "YES")
                                        readOnlyVal = "disabled";
                            }
                        } //A End Order Details
                    }
                    if (ProdName == "A End Details" && top.LocIdenA == "EXISTING SERVICE ID")
                        readOnlyVal = "disabled";
                    if (ProdName == "B End Details" && top.LocIdenB == "EXISTING SERVICE ID")
                        readOnlyVal = "disabled";
                    break;
                case "RemoteTimingSource":
                    if (top.Type != "ShiftA") {
                        if (ProdName == "B End Order Details") {
                            if ((selectedAtt == "Not Required" && top.EnableSync == "No") || (selectedAtt == "Not Required" && top.EnableSync == "Yes" && top.syncOptB == "BITS SSM") || (selectedAtt == "Yes" && top.EnableSync == "Yes" && top.syncOptA == "BITS SSM" && top.NTEB == "Single Service Chassis")) //[Bhavesh][ORCE-76669][R3050.4][Sandhya][2800.7][OR9814_additional][Vikram][2800.3][OR9814]// making the defaulting rules to work on load event
                            {
                                readOnlyVal = "disabled";
                                if (top.Modify == "EAD" || top.Type == "MSF")
                                    if (top.Prev_EnableSync == "YES")
                                        readOnlyVal = "disabled";
                            }
                        } //B end Order Details
                    }
                    if (top.Type != "ShiftB") {
                        if (ProdName == "A End Order Details") {
                            if ((selectedAtt == "Not Required" && top.EnableSync == "No") || (selectedAtt == "Not Required" && top.EnableSync == "Yes" && top.syncOptA == "BITS SSM")) // making the defaulting rules to work on load event
                            {
                                readOnlyVal = "disabled";
                                if (top.Modify == "EAD" || top.Type == "MSF")
                                    if (top.Prev_EnableSync == "YES")
                                        readOnlyVal = "disabled";
                            }
                        } //A End Order Details
                    }
                    if (ProdName == "A End Details" && top.LocIdenA == "EXISTING SERVICE ID")
                        readOnlyVal = "disabled";
                    if (ProdName == "B End Details" && top.LocIdenB == "EXISTING SERVICE ID")
                        readOnlyVal = "disabled";
                    break;
                case "TRChargeBand":
                    break; // [Avinash][2350.3][QC 17461]
                case "OOHPreference":
                    switch (top.svr_act) // [Avinash][2350.3][QC 17461] [Avinash][2400.1][ORCE-39555]
                    {
                        case "Site Survey":
							if((top.Amend == "CRA" || top.Amend == "ECC" || top.Amend == "SAS") ||((top.Amend == "TRC"|| top.Amend == "BT" )  && (top.InterStatus != "ACKNOWLEDGED" && top.InterStatus != "SURVEYPOSTCOMMITTED" ))) 
									readOnlyVal = "disabled";			
										break;
									
						case "External work at Premise": 		
								if ((top.Amend == "ECC" || top.Amend == "SAS") && (top.InterStatus != "ACKNOWLEDGED")) //[Sandhya][2700.4.4]
									readOnlyVal = "disabled";
								else if(( top.Amend == "TRC" || top.Amend =="BT" ) && (top.InterStatus =="BUILDCOMPLETE" || top.InterStatus=="BUILDCOMMISSIONED" || top.InterStatus == "COMPLETED"))
 									readOnlyVal = "disabled";
 								else if ((top.Amend == "CRA") && (top.InterStatus != "ACKNOWLEDGED" && top.InterStatus != "SURVEYPOSTCOMMITTED" ))   
 									readOnlyVal = "disabled";
						break;
							
						case "Equipment Installation and Fibre Testing": 					
							 if(( top.Amend == "TRC"|| top.Amend == "ECC" || top.Amend == "CRA" || top.Amend == "SAS" || top.Amend == "BT") && (top.InterStatus == "BUILDCOMPLETE" || top.InterStatus == "BUILDCOMMISSIONED" || top.InterStatus == "COMPLETED"))
 									readOnlyVal = "disabled";
							break;
							
                        default:
                            if (top.InterStatus != "ACKNOWLEDGED" && top.Amend != "")
                                readOnlyVal = "disabled";
                            break;
                    }
                    break; 
                default:
                    break;
            }
        } //Condition Based Readonly Ends

        // JS Refactor Ends


        if (attName == "User-LLFEnabledDirection" && selectedAtt == "None")
            readOnlyVal = " disabled";

        if (readOnlyVal == "") //NGA-1520 ORC2M-15307 CM-40063_Make a drop-down with one value as read-only on Product Details_2000.8
        {
            var readOnlySingle = 0;
            for (var i = 0; i < nDomainLen; i++) {
                var attDomainPropSet = attPropSet.GetChild(i);
                var enabled = attDomainPropSet.GetProperty("CxEnabled");
                var excluded = attDomainPropSet.GetProperty("Excluded");
                displayValue = attDomainPropSet.GetProperty("AttValue");
                /*if(ProdName == "B End Details" && (displayValue == "BITS SSM" || displayValue == "Dual BITS SSM" || displayValue == "Client SyncE ESM" || displayValue == "Dual BITS/Client SSM/ESM") && top.syncOptB != "Sync Output")   //start
			  {
				if(enabled == "N")
				 {
					if((top.NTEB == "4U 15 Slot Modular" && top.syncOptB != "Sync Output") ||(top.NTEB == "1U Single Slot" && (displayValue == "BITS SSM" || displayValue == "Client SyncE ESM" || displayValue == "Dual BITS/Client SSM/ESM")))
					enabled ="Y";
					}
			     }
				if (enabled == "Y"&& excluded != "N")
				{
				readOnlySingle++;
				}
			}
		 if(readOnlySingle == 1)
			readOnlyVal = " disabled";	*/

                if (enabled == "Y" || ((attName == "EnableSynchronisation" || attName == "User-LLFEnabled") && enabled == "N" && excluded == "N")) // Sudip - QC#35637 -- Abhijit :QC# 32336---Jawahar; Upgrade Changes for making single value readonly
                {
                    readOnlySingle++;
                }

            }
            if (readOnlySingle == 1)
                readOnlyVal = "disabled";
        }


        if (attName == "SynchronisationOption" || attName == "ServiceDeliveryInformation")
            selectOptionHTML = "<select id=\"" + id + "\" onchange='setSequence(this) && processInput(\"" + id +
            "\", \"\",  \"select\")' " + readOnlyVal + " style= \"width :170px;\">";
        else if (attName == "InterfaceType" || attName == "NTEChassisOption") //vikram 2900.3 ORCE-68319
        {
            selectOptionHTML = "<select id=\"" + id + "\" onchange='setSequence(this) && processInput(\"" + id +
                "\", \"\",  \"select\")' " + readOnlyVal + " style= \"width :160px;\">";
        } else
            selectOptionHTML = "<select id=\"" + id + "\" onchange='setSequence(this) && processInput(\"" + id +
            "\", \"\", \"select\")' " + readOnlyVal + ">";

        for (var i = 0; i < nDomainLen; i++) {
            var excluded = "";
            var attDomainPropSet = attPropSet.GetChild(i);
            displayValue = attDomainPropSet.GetProperty("AttValue");
            excluded = attDomainPropSet.GetProperty("Excluded");

            //		For Quotation journey

            if (attName == "Bandwidth" && i == 0)
                top.Bandwidth = displayValue;


            if (attName == "Reach" && i == 0)
                top.Reach = displayValue;

            //		End  


            //		alert(attName+"_"+displayValue+"_"+selectedAtt);

            if (displayValue == selectedAtt) {
                selectedTag = " selected";
            } else {
                selectedTag = "";
            }

            enabled = attDomainPropSet.GetProperty("CxEnabled");


            if (ProdName == "B End Details" && (displayValue == "BITS SSM" || displayValue == "Dual BITS SSM" || displayValue == "Client SyncE ESM" || displayValue == "Dual BITS/Client SSM/ESM") && top.syncOptB != "Sync Output") //start
            {
                if (enabled == "N") {
                    if ((top.NTEB == "Multiple Services Chassis" && top.syncOptB != "Sync Output") || (top.NTEB == "Single Service Chassis" && (displayValue == "BITS SSM" || displayValue == "Client SyncE ESM" || displayValue == "Dual BITS/Client SSM/ESM"))) //[Bhavesh][ORCE-76669][R3050.4][Sandhya][2800.7][OR9814_additional][Vikram][2800.3][OR9814]
                        enabled = "Y";
                }
            } // end 

            if (excluded == "N") {
                dispStyle = "eCfgOptionAvailable"; //eCfgOptionAvailable
            } else {
                if (enabled == "Y")
                    dispStyle = "eCfgOptionAvailable";
                else
                    dispStyle = "eCfgOptionExcluded";
            }

            if (displayValue == "Not Required" && ProdName == "A End Details" && attName == "SynchronisationOption" && top.EnableSync == "Yes") //SyncE_OR-5351_1900.7_Vaibhav
            {} else if (displayValue == "Dual BITS SSM" && ProdName == "A End Details" && attName == "SynchronisationOption" && top.EnableSync == "Yes" && top.NTEA == "Single Service Chassis") //[Bhavesh][ORCE-76669][R3050.4][Sandhya][2800.7][OR9814_additional]SyncE_OR-7909_Jawahar
            {}
            //SyncE_OR_7909_Neha 2000.13 Exclude Not Required
            else if (displayValue == "Not Required" && ProdName == "B End Order Details" && attName == "RemoteTimingSource" && top.EnableSync == "Yes" && top.syncOptB == "Sync Output" && (top.Modify == "Bend" || top.Modify == "") && (top.Type == "" || top.Type == "ShiftB"))
            //Basic Provide, Amend on Basic Provide, Modify Ends, Amend on Modify Ends
            {} else if (displayValue == "Not Required" && ProdName == "B End Order Details" && attName == "RemoteTimingSource" && top.Prev_EnableSync != "YES" && top.EnableSync == "Yes" && top.syncOptB == "Sync Output" && (top.Modify == "EAD" || top.Type == "MSF"))
            //N-Y and Y MSF and Amend on MSF
            {} else {

                if (excluded != "Y" || enabled == "Y") {
                    spanId = grpItemId + _underscore + "ATTRDOMAIN" + _pipe + displayValue;
                    if(displayValue != "Underground footway box")
					{
						selectOptionHTML = selectOptionHTML +
                        "<option id=\"" + spanId + "\" value=" + "\"" + "GRPITEM" + _pipe + grpItemId +
                        _underscore + "ATTTYPE" + _pipe + attType +
                        _underscore + "ATTVAL" + _pipe + displayValue +
                        "\" class=\"" + dispStyle + "\" " + selectedTag + ">" + displayValue + "</option>";
					}	
                    //alert("to be removed"+ displayValue);
                }
            }

        }
        selectOptionHTML += "</select>";

        td.innerHTML = selectOptionHTML;
    }
}

top.hi = 1;
top.svr_act;

function RP_showCombo(grpItemId) {
    showComboEAD(grpItemId);
}

function RP_showComboEAD(grpItemId) {
    showComboEAD(grpItemId);
}


function showDomainAndChildrenControlChild(grpItemId, controlType) {
    var noneSelected = "Y";
    var portItemId = "";
    var rowType = _underscore + "PROD" + _pipe;
    var tableObj;
    var tr;
    var td;
    var i, j, nDomainLen;
    var theBgColor = "#F2EFF5";

    spanObj = document.getElementById("SPAN_" + grpItemId);
    spanObj.innerHTML = "<table id=\"" + grpItemId + "\"></table>";

    tableObj = document.getElementById(grpItemId);
    var resultPropSet = m_UIFramework.m_controlPropSet.GetChildByType(grpItemId);
    var portPropSet = resultPropSet.GetChildByType("Domain");
    var fieldListPropSet = new JSSCfgPropertySet();
    var strFieldList = resultPropSet.GetProperty("FieldList");
    fieldListPropSet.DecodeFromString(strFieldList);
    nDomainLen = portPropSet.GetChildCount();

    //Insert the field header
    tr = tableObj.insertRow(-1);
    if (controlType != "quantity") {
        td = tr.insertCell(-1);
        td.innerHTML = m_UIFramework.whiteImage;
    }
    displayFieldHeader(tr, fieldListPropSet);

    if (controlType == "radio") {
        //Add a slot for "none" option
        //I'm only adding the row here.
        //The contents of the row is contructed after the for loop below.
        //The reason is so that we know whether or not to check the "none"
        //I could also do "tableObj.insertRow (0) at the end, but according to MSDN, this is
        //more expensive
        tr = tableObj.insertRow(-1);
        portItemId = portPropSet.GetProperty("Port Item Id");
        strRowId = grpItemId + rowType + "none";
        tr.id = strRowId;
    }

    for (i = 0; i < nDomainLen; i++) {
        var className = "";
        var displayName = "";
        var DispStyle = "";
        var enable = "";
        var hasGeneric = "";
        var excluded = "";
        var innerHTML = "";
        var isChecked = "";
        var quantity = "";
        var path = "";
        var prodId = "";
        var selected = "";
        var strRowId = "";
        var strSpanId = "";

        //Default values for the Display Style
        if (controlType == "checkbox" ||
            controlType == "quantity")
            DispStyle = 'eCfgSpanAvailable';
        else if (controlType == "radio")
            DispStyle = 'eCfgRadioAvailable';

        //These are the possible "default" values that we need to show a port domain/item
        portDomainPropSet = portPropSet.GetChild(i);
        excluded = portDomainPropSet.GetProperty("Excluded");
        prodId = portDomainPropSet.GetProperty("Product Id");
        portItemId = portDomainPropSet.GetProperty("Port Item Id");
        displayName = portDomainPropSet.GetProperty("CxObjName");
        enable = portDomainPropSet.GetProperty("CxEnabled");
        selected = portDomainPropSet.GetProperty("Selected");
        quantity = portDomainPropSet.GetProperty("Quantity");
        hasGeneric = portDomainPropSet.GetProperty("RequireMoreChild");
        //isComplex = portDomainPropSet.GetProperty ("IsComplexProduct");           
        if (isNaN(quantity))
            quantity = "";
        path = portDomainPropSet.GetProperty("Path");
        tr = tableObj.insertRow(-1);
        strRowId = grpItemId + _underscore + "PROD" + _pipe + prodId;
        tr.id = strRowId;
        //Make sure we are top aligned
        tr.style.verticalAlign = "top";
        // Change the bgcolor so that you can tell which attributes are associated with which products
        if (theBgColor == "#F2EFF5") {
            tr.style.backgroundColor = theBgColor;
            theBgColor = "#F2EFF5";
        } else {
            tr.style.backgroundColor = theBgColor;
            theBgColor = "#F2EFF5";
        }
        if (excluded == "Y" && enable == "N")
            tr.style.display = "none";

        if (selected == "Y") {
            if (controlType == "checkbox" ||
                controlType == "quantity")
                DispStyle = 'eCfgSpanSelected';
            else if (controlType == "radio") {
                DispStyle = 'eCfgRadioSelected';
                noneSelected = "N";
            }
        } else {
            if (enable == "N") {
                if (controlType == "checkbox" ||
                    controlType == "quantity")
                    DispStyle = 'eCfgSpanExcluded';
                else if (controlType == "radio")
                    DispStyle = 'eCfgRadioExcluded';
            }
        }

        //1. Display the first column for this control
        //   If it's a radio button: display radio button
        //   If it's a quantity list: display a quantity box
        //   If it's a checkbox: display a checkbox
        td = tr.insertCell(-1);
        td.valign = "top";
        if (controlType == "quantity") {
            td.id = strRowId + _underscore + "FIELD" + _pipe + "Quantity";
            addHtmlAttrib(fieldListPropSet, "Quantity", td);

            innerHTML = innerHTML +
                "<input type=\"text\"" + " id=" + td.id + "_INPUT" + " TABINDEX=\"99\"" + " STYLE=\"width:3.75em\"" + " value=\"" + quantity +
                "\" onchange='processInput(\"GRPITEM" + _pipe + grpItemId + _underscore + "PROD" + _pipe +
                prodId + "\", \"\", \"text\")'>" +
                "</input>";
        } else if (controlType == "checkbox" ||
            controlType == "radio") {
            if (selected == "Y")
                isChecked = " checked>";
            else
                isChecked = ">";
            var readOnlyVal = "disabled";
            td.id = strRowId + _underscore + "FIELD" + _pipe + "Quantity";
            // innerHTML = innerHTML + 
            //           "<input type=\"" + controlType + "\" name=\"GRPITEM" + _pipe + grpItemId + _underscore + "DOMAIN\"" +
            //         " onclick='processInput(\"GRPITEM" + _pipe + grpItemId + _underscore + "PROD" + _pipe + prodId + 
            //                               "\", \"\", \"" + controlType + "\")'" + readOnlyVal +
            //     isChecked + "</input>"; 
        }

        td.innerHTML = innerHTML;

        //2. Display the second column in this control.
        //   For all types of controls, this would be the name of the product.     
        td = tr.insertCell(-1);
        td.valign = "top";
        addHtmlAttrib(fieldListPropSet, "Name", td);

        strSpanId = grpItemId + _underscore + "PORTDOMAIN" + _pipe + prodId;
        innerHTML = "<span id=\"" + strSpanId + "\" class=\"" + DispStyle + "\">";
        if (selected == "Y" && portDomainPropSet.GetProperty("CanDrillDown") == "Y") {
            //innerHTML = innerHTML + "<a id=\"" + strSpanId + _underscore + "CXLINK\" href='javascript:processInput(\"GRPITEM" + _pipe + grpItemId + _underscore + "PROD" + _pipe + prodId + "\", \"SetTopObj\", \"linkMethod\")'>";
        }
        //   innerHTML += displayName;
        //if (selected == "Y" && portDomainPropSet.GetProperty ("CanDrillDown") == "Y")
        //   innerHTML += "</a>";
        innerHTML += "</span>";
        td.innerHTML = innerHTML;
        addGenerics(resultPropSet, td, path, hasGeneric);
        //3. Display the field list
        displayFieldList(tr, rowType, resultPropSet.GetType(), fieldListPropSet, portDomainPropSet, true);
        td2 = tr.insertCell(-1);
        td2.id = "AP1";
        td2.innerHTML = '<span id="thePlace' + path + '"></span>';
    }

    if (controlType == "radio") {
        //Add none option
        portItemId = portPropSet.GetProperty("Port Item Id");
        strRowId = grpItemId + rowType + "none";
        tr = document.getElementById(strRowId);

        td = tr.insertCell(-1);
        td.id = strRowId + _underscore + "FIELD" + _pipe + "Quantity";

        if (noneSelected == "Y")
            isChecked = " checked>";
        else
            isChecked = " >";

        innerHTML = "<input type=\"" + controlType +
            "\" name=\"GRPITEM" + _pipe + grpItemId + _underscore + "DOMAIN\"" +
            " onclick='processInput(\"GRPITEM" + _pipe + grpItemId + _underscore + "PROD" + _pipe +
            "none" + "\", \"\", \"" +
            controlType + "\")'" + isChecked +
            "</input>";
        td.innerHTML = innerHTML;

        td = tr.insertCell(-1);
        addHtmlAttrib(fieldListPropSet, "Name", td);
        td.innerHTML = "None";
    }
}

function showSelectAndOptions(tableId) {

    var buttonHTML = "";
    var inputId = "";
    var inputHTML = "";
    var selectOptionHTML = "";
    var tableObj = null;
    var tr = null;
    var resultPropSet = null;
    var objArray = null;
    var optionId = "";
    var portPropSet = null;
    var portDomainPropSet = null;
    var portItemId = "";
    var portItemSpanId = "";
    var nDomainLen = 0;
    var i = 0;
    var selectId = "";
    var spanObj = null;
    var td1 = null;
    var td2 = null;
    var td3 = null;
    var td4 = null;
    var sp = new Array(-1);

    spanObj = document.getElementById("SPAN_" + tableId);
    spanObj.innerHTML = "<table id=\"" + tableId + "\"></table>";

    tableObj = document.getElementById(tableId);

    resultPropSet = m_UIFramework.m_controlPropSet.GetChildByType(tableId);
    resultPropSet.SetProperty("PortItemCount", "0");

    //Title
    tr = tableObj.insertRow(-1);

    td1 = tr.insertCell(-1);
    td1.innerHTML = sComboAddNameLabel;

    td1.width = "100";
    td1.align = "left";

    td1 = tr.insertCell(-1);
    td1.innerHTML = sComboAddQtyLabel;
    td1.width = "5";
    td1.align = "left";

    td1 = null;

    portPropSet = resultPropSet.GetChildByType("Domain");
    nDomainLen = portPropSet.GetChildCount();

    //   alert("chkProfileattr--"+theApplication().SetProfileAttr("temp");


    //Insert an empty option
    portItemId = portPropSet.GetProperty("Port Item Id");
    optionId = tableId + _underscore + "PORTDOMAIN" + _pipe + "none";
    selectId = tableId + _underscore + "DOMAINSELECT";
    selectOptionHTML = "<select id=" + selectId + ">" +
        "<option value=\"" + "GRPITEM" + _pipe + tableId + _underscore + "PROD" + _pipe + "none\" " +
        "id =\"" + optionId + "\" " +
        "class=\"" + "eCfgOptionAvailable" + "\" " +
        "selected>" +
        "</option>";


    for (i = 0; i < nDomainLen; i++) {


        var prodId = "";
        var className = "";
        var displayName = "";
        var excluded = "";
        var enable = "";

        portItemId = "";
        optionId = "";

        portDomainPropSet = portPropSet.GetChild(i);
        excluded = portDomainPropSet.GetProperty("Excluded");
        prodId = portDomainPropSet.GetProperty("Product Id");
        portItemId = portDomainPropSet.GetProperty("Port Item Id");
        displayName = portDomainPropSet.GetProperty("CxObjName");
        enable = portDomainPropSet.GetProperty("CxEnabled");


        optionId = tableId + _underscore + "PORTDOMAIN" + _pipe + prodId;

        if (enable == "Y")
            className = "eCfgOptionAvailable";
        else
            className = "eCfgOptionExcluded";

        if (excluded != "Y" || enable == "Y") {
            selectOptionHTML = selectOptionHTML +
                "<option value=\"" + "GRPITEM" + _pipe + tableId + _underscore + "PROD" + _pipe + prodId + "\" " +
                "id =\"" + optionId + "\" " +
                "class=\"" + className + "\" " + " >" +
                displayName +
                "</option>"; ///Selecting the CP Services


        }
    }

    //end loop

    selectOptionHTML += "</select>";

    inputId = tableId + _underscore + "DOMAININPUT";
    inputHTML = "<input id=\"" + inputId + "\" type=\"text\"/>";
    buttonHTML = "<input type=\"button\" value=\"" + sAddItemLabel + "\" " +
        "onclick='processInput(\"" + inputId + "\", \"" + selectId + "\", \"ComboAdd\")' />";

    tr = tableObj.insertRow(-1);
    td1 = tr.insertCell(-1);
    td2 = tr.insertCell(-1);
    td3 = tr.insertCell(-1);

    td1.innerHTML = selectOptionHTML;
    td2.innerHTML = inputHTML;
    td3.innerHTML = buttonHTML;

    //Setup an empty place holder for the Port Items

    //It's ashame we need to put the indentation here, instead of in eCfgRelationContentsJS.swt  
    portItemSpanId = tableId.replace(/PORT/, "PORTITEM");

    spanObj = document.getElementById("SPAN_" + portItemSpanId);
    spanObj.innerHTML = "<table border=\"0\" cellpadding=\"0\" cellspacing=\"3\" width=\"100%\"></table>";
    objArray = spanObj.getElementsByTagName("table");
    tr = objArray[0].insertRow(-1);
    td1 = tr.insertCell(-1);
    td1.align = "center";
    td1.innerHTML = "<table id=\"" + portItemSpanId + "\"></table>";
}




function RP_showComboOrText(grpItemId) {

    var dispStyle = "";
    var displayValue = "";
    var enabled = "";
    var nDomainLen = 0;
    var selectId = "select_" + grpItemId;
    var selectedIndex = -1;
    var selectedTag = "";
    var selectOptionHTML = "";
    var spanId = "";
    var tr = null;
    var td = null;
    var id = grpItemId + _underscore + "DOMAINSELECT";
    var comboPropSet = m_UIFramework.m_controlPropSet.GetChildByType(grpItemId);


    var parProdId = comboPropSet.GetProperty("Parent Path");
    var isReqd = comboPropSet.GetProperty("IsRequired");
    var objType = comboPropSet.GetProperty("Object Type", objType);
    var fieldListPropSet = new JSSCfgPropertySet();
    var strFieldList = comboPropSet.GetProperty("FieldList");
    fieldListPropSet.DecodeFromString(strFieldList);


    var spanObj = document.getElementById("thePlace" + parProdId);
    var attDispName = comboPropSet.GetProperty("Attribute Display Name");
    var attName = comboPropSet.GetProperty("AttName");
    var selectedAtt = comboPropSet.GetProperty("AttValue");



    if (attName == "TRChargeBand") //OOHPREF == YES EXCLUDES TRC BAND = 0
    {
        top.TRC_OOH = selectedAtt;
        top.TRFlag = 2; //Neha 2000.14 TRC Validation vs OOH
    }
    if (attName == "OOHPreference") {
        if (attValue == "Yes") {
            top.EXCLUDE_OOH = "Y";
        } else {
            top.EXCLUDE_OOH = "";
        }

    }



    if ((top.Quotation == "QUOTATION" && (attName == "RadialDistance" || attName == "MainLinkDistance")) || (top.Quotation != "QUOTATION" && attName != "RadialDistance" && attName != "MainLinkDistance")) //v1

    {

        spanObj.innerHTML += "<table id=\"" + grpItemId + "\" valign=top></table>";
        tableObj = document.getElementById(grpItemId);

        var readOnlyVal = "";
        var spanId = "";
        var ProdName = sProdName;
        var attType = comboPropSet.GetProperty("AttType");
        var attId = comboPropSet.GetProperty("XA Id");
        var selectedAtt = comboPropSet.GetProperty("AttValue");
        var readOnly = comboPropSet.GetProperty("CxReadOnly");
        var attPropSet = comboPropSet.GetChildByType("Domain");
        nDomainLen = attPropSet.GetChildCount();


        //Amend Additional Info Matrix 
        switch (top.Type) {

            case "MSF":

                if (attName != "Bandwidth" || attName == "ECChargeBand") {
                    readOnlyVal = "disabled";
                }
                break;

            case "ShiftA":
                if (ProdName == "A End Details" && (attName != "Chassis" && attName != "Floor" && attName != "Housing" && attName != "LLUCNumber" && attName != "NTEChassisOption" && attName != "PowerSupply" && attName != "Rack" && attName != "Room" && attName != "Slot" && attName != "Suite" && (attName == "ECChargeBand" && top.Amend != "ECC" && top.InterStatus != "ACKNOWLEDGED") && attName != "Reach")) {
                    readOnlyVal = "disabled";
                }
                break;

            case "ShiftB":
                if (ProdName == "B End Details" && (attName != "Chassis" && attName != "Floor" && attName != "Housing" && attName != "LLUCNumber" && attName != "NTEChassisOption" && attName != "PowerSupply" && attName != "Rack" && attName != "Room" && attName != "Slot" && attName != "Suite" && (attName == "ECChargeBand" && top.Amend != "ECC" && top.InterStatus != "ACKNOWLEDGED") && attName != "Reach")) {
                    readOnlyVal = "disabled";
                }
                break;
            default:
                break;
        }
        if (attName == "ResilienceViolationConfirmation") {
            top.RVC = selectedAtt;
        }
        if (top.ECC_FLG == "Y" || top.ECC_FLG == "N") {
            if (attName == "ECChargeBand") {
                top.ECC_VAL_Current = selectedAtt;
                top.ECC_VAL_Current = top.ECC_VAL_Current.toUpperCase();
            }
        }

        //AP Added
        tr = tableObj.insertRow(-1);
        tr.id = grpItemId + _underscore + "COMBOBOX";
        td = tr.insertCell(-1);

        td.style.width = "160";
        td.style.wordWrap = "break-word";
        td.innerHTML = attDispName;

        if (isReqd == "Y") {
            td.innerHTML += "<font color=red >*</font>";
        }
        td = tr.insertCell(-1);
        td.id = grpItemId + _underscore + "COMBOBOX_TD";
        if (nDomainLen > 0) {
            if (readOnly == "Y" || (top.InterStatus != "ACKNOWLEDGED" && attName == "ECChargeBand" && top.Amend != "ECC" && top.InterStatus != "NA") || (top.Amend != "MRV" && attName == "ResilienceViolationConfirmation") || (top.Amend == "MRV" && attName == "ECChargeBand"))
                readOnlyVal = "disabled";
            else if (top.Type == "MSF" && (attName == "ECChargeBand")) //changes for defect 3533 || attName == "TRChargeBand"))//Amend Additional Info matrix
                readOnlyVal = "disabled";

            else {
                readOnlyVal = "";


                //TRC Change(Abhishek)

                if (attName == "TRChargeBand" && top.Amend == "MRV") {
                    readOnlyVal = "disabled";
                }


                if (attName == "TRChargeBand" && (top.Amend == "" || top.Amend == "BT" || top.Amend == "TRC") && (top.InterStatus == "BUILDCOMMISSIONED" || top.InterStatus == "COMPLETED") && (top.Amend == "CRA" || top.Amend == "TRC")) {
                    readOnlyVal = "disabled";
                }

                /*if (attName == "ECChargeBand" && top.Amend == "TRC")
                		{
                			readOnlyVal = "disabled";
                		}*/
                //TRC Change(Abhishek)

            }
            selectOptionHTML = ""

            selectOptionHTML += " <select id=\"" + id + "\" onchange='processInput(\"" + id +
                "\", \"\", \"select\")' " + readOnlyVal + ">";

            for (var i = 0; i < nDomainLen; i++) {
                var excluded = "";
                var attDomainPropSet = attPropSet.GetChild(i);
                displayValue = attDomainPropSet.GetProperty("AttValue");
                excluded = attDomainPropSet.GetProperty("Excluded");

                if (displayValue == selectedAtt)
                    selectedTag = " selected";
                else
                    selectedTag = "";
                enabled = attDomainPropSet.GetProperty("CxEnabled");

                if (enabled == "Y")
                    dispStyle = "eCfgOptionAvailable";
                else
                    dispStyle = "eCfgOptionExcluded";

                if (excluded != "Y" || enabled == "Y") {
                    spanId = grpItemId + _underscore + "ATTRDOMAIN" + _pipe + displayValue;
                    selectOptionHTML = selectOptionHTML +
                        "<option id=\"" + spanId + "\" value=" + "\"" + "GRPITEM" + _pipe + grpItemId +
                        _underscore + "ATTTYPE" + _pipe + attType +
                        _underscore + "ATTVAL" + _pipe + displayValue +
                        "\" class=\"" + dispStyle + "\" " + selectedTag + ">" + displayValue + "</option>";
                }
            }

            selectOptionHTML += "</select>";

            td.innerHTML = selectOptionHTML;

        } else { // AP If

            var innerHTML;
            var displayValue = comboPropSet.GetProperty("Value");
            var readOnly = comboPropSet.GetProperty("CxReadOnly");
            if (readOnly == "Y")
                innerHTML = selectedAtt;
            else
                innerHTML = ""

            var fieldLength = comboPropSet.GetProperty(".FieldLength");
            var fieldSize = comboPropSet.GetProperty(".FieldSize");
            if (typeof(fieldLength) == "undefined") {
                fieldLength = "100";
            }

            if (typeof(fieldSize) == "undefined") {
                fieldSize = "20";
            }

            if (top.Quotation == "QUOTATION") {
                readOnlyVal = "disabled";


                innerHTML += "<input type=\"text\" " +
                    "value=\"" + selectedAtt + "\" " +
                    "maxlength=\"" + fieldLength + "\" " +
                    "size=\"" + fieldSize + "\" " +
                    "id=\"GRPITEM" + _pipe + grpItemId +
                    _underscore + "ATTTYPE" + _pipe + "TEXT" +
                    "\"" + " onchange='removeSpecialChar(this.value);RP_customValidate(\"" + attName + "\",this.value,this,\"" + _pipe + "\",\"" + grpItemId + "\",\"" + _underscore + "\",\"" + displayValue + "\")'" + readOnlyVal + "/>";
            } else {

                innerHTML += "<input type=\"text\" " +
                    "value=\"" + selectedAtt + "\" " +
                    "maxlength=\"" + fieldLength + "\" " +
                    "size=\"" + fieldSize + "\" " +
                    "id=\"GRPITEM" + _pipe + grpItemId +
                    _underscore + "ATTTYPE" + _pipe + "TEXT" +
                    "\"" + " onchange='removeSpecialChar(this.value);RP_customValidate(\"" + attName + "\",this.value,this,\"" + _pipe + "\",\"" + grpItemId + "\",\"" + _underscore + "\",\"" + displayValue + "\")' />";
            }

            if (comboPropSet.GetProperty("EditField") == "Y") {
                var attId = comboPropSet.GetProperty("AttID");
                innerHTML += "<img src = \"images/icon_pick.gif \" onclick = 'm_UIFramework.EditField(\"" + attId + "\")' />";
            }
            td.innerHTML += innerHTML;

        } // End AP If
    }
}

function RP_updateSelectionInfoForAttribute(selectInfoPropSet) {
    var attObj = null;
    var attName = selectInfoPropSet.GetProperty("AttName");
    var attValue = selectInfoPropSet.GetProperty("AttValue");
    var ProdName = sProdName;
    //debugger;
    switch (attName) {
        case "Bandwidth":
            top.Band = attValue;
            break;
        case "SeparateFromCircuitNumber":
            top.CircuitNumber = attValue;
            break;
        case "ResilienceOption":
            top.Resilience = attValue;
            SubmitToQueue("m_UIFramework.RefreshUI ()"); // TCR 5159
            break;
        case "SASReference":
            top.SASRef = attValue;
            break;
        case "LLUCNumber":
            top.CurrentLLUC = attValue;
            break;
        case "Reach":
            top.ReachAmend = attValue;
            break;
        case "ResilienceViolationConfirmation":
            top.RVC = attValue;
            break;
        case "ServiceDeliveryChargeAccepted": //[Rg0069876][ORCE-34981]
            top.SDCA = attValue;
            break;
        case "ContractTerm":
            top.ContTerm = attValue;
            break;
        case "InterfaceType":
            if (ProdName == "A End Order Details")
                top.IntA = attValue;
            else
                top.IntB = attValue;
            break;
        case "Slot":
            if (ProdName == "A End Order Details")
                top.SlotA = attValue;
            else
                top.SlotB = attValue;
            break;
        case "TRChargeBand":
            top.TRC_OOH = attValue;
            break;
			
		case "FibreOption":      // [Satyam][QC#77207][R3500.8.3]
            top.FibreOption = attValue;
			//SubmitToQueue("m_UIFramework.RefreshUI ()");
            break;
        case "Housing":
            if (ProdName == "A End Order Details")
                top.HousingA = attValue;
            else
                top.HousingB = attValue;
            break;
		case "LocationId":
			if (sProdName == "A End Order Details") {
                top.LocationIdA = attValue.length;
				//top.LocationIdAval = attValue;
                /*if(top.LocationIdA>28)
				{	debugger;
					//top.LocationIdAval = "";
					alert("Please ensure the location id  is less than  or equal to 28 characters for A End Details.");
					m_UIFramework.m_bRequestLock = false;
					SubmitToQueue ("m_UIFramework.RefreshUI ()");
					return false;
					
				}*/
            } else if (sProdName == "B End Order Details") {
                top.LocationIdB = attValue.length;
				//debugger;
				//top.LocationIdAval = attValue;
				/*if(top.LocationIdB>28)
				{
					//top.LocationIdBval = "";
					alert("Please ensure the location id  is less than  or equal to 28 characters for B End Details.");
					m_UIFramework.m_bRequestLock = false;
					SubmitToQueue ("m_UIFramework.RefreshUI ()");
					return false;
				}*/
                //SubmitToQueue("m_UIFramework.RefreshUI ()");
            } else {}
            break;	

            //Changed for Location type hiding sampad
        case "LocationType":
            if (sProdName == "A End Order Details") {
                top.LocationTypeA = attValue;
                SubmitToQueue("m_UIFramework.RefreshUI ()");
            } else if (sProdName == "B End Order Details") {
                top.LocationTypeB = attValue;
                SubmitToQueue("m_UIFramework.RefreshUI ()");
            } else {}
            break;
            //End

            /*	case "ECChargeBand":    Avinash 2700.4
            			top.ECC_VAL_Current = attValue;
            		break;  */
        case "AuthorisedECC": // Avinash 2700.4
            top.ECC_VAL_Current = attValue;
            break;
        case "User-LLFEnabled":
            top.LLFEnabled = attValue;
            SubmitToQueue("m_UIFramework.RefreshUI ()");
            break;
        case "User-LLFEnabledDirection":
            top.LLFEnabledDir = attValue;
            break;
        case "EnableSynchronisation": //SyncE_OR-5351_1900.7_Vaibhav
            top.EnableSync = attValue;
            break;
        case "SynchronisationOption":
            if (ProdName == "A End Order Details") {
                top.syncOptA = attValue;
                SubmitToQueue("m_UIFramework.RefreshUI ()"); //EAD_OR_7909_Jawahar

            } else {
                top.syncOptB = attValue;
                SubmitToQueue("m_UIFramework.RefreshUI ()");
            }
            break;
        case "LinkedOrderReference":
            if (sProdName == "A End Order Details")
                top.LornA = attValue;
            else
                top.B = attValue;
            break;
        case "LocalTimingSource":
            if (sProdName == "A End Order Details")
                top.LTSA = attValue;
            else {
                top.LTSB = attValue;
                SubmitToQueue("m_UIFramework.RefreshUI ()");
            }

            break;
        case "RemoteTimingSource":
            if (sProdName == "A End Order Details")
                top.RTSA = attValue;
            else
                top.RTSB = attValue;
            break;
        case "13AmpDoubleSocketWithin1Metre": //Pavan 1900.12
            if (sProdName == "A End Order Details")
                top.PS13AmpA = attValue;
            else
                top.PS13AmpB = attValue;
            break;
        case "TelephoneWithin3Metres": //Pavan 1900.12
            if (sProdName == "A End Order Details")
                top.PSTelepA = attValue;
            else
                top.PSTelepB = attValue;
            break;
        case "ThirdPartyAccessRequired": //Pavan 1900.12
            if (sProdName == "A End Order Details")
                top.PSThirA = attValue;
            else
                top.PSThirB = attValue;
            break;
        case "FibreServiceInSameAEndLoc": //Pavan 1900.12
            top.PSFibrA = attValue;
            break;
        case "FibreServiceInSameBEndLoc": //Pavan 1900.12
            top.PSFibrB = attValue;
            break; //pavan
        case "LandlordsConsentNecessary": //Pavan 1900.12		
            if (sProdName == "A End Order Details")
			{
                top.PSLandNA = attValue;
				if(top.PSLandNA == "Please select")
						{
							top.PSLandA ="";
							top.PSLandNameA ="";
							top.PSLandNoA ="";
						}
			}	
            else
			{
                top.PSLandNB = attValue;
				if(top.PSLandNB == "Please select")
						{
							top.PSLandB ="";
							top.PSLandNameB ="";
							top.PSLandNoB ="";
						}
			}	
            SubmitToQueue("m_UIFramework.RefreshUI ()");
            break;
        case "LandlordsConsentGranted": //Pavan 1900.12
            if (sProdName == "A End Order Details")
			{
                top.PSLandA = attValue;
				if(top.PSLandA == "Please select")
						{
							
							top.PSLandNameA ="";
							top.PSLandNoA ="";
						}
			}	
            else
			{
                top.PSLandB = attValue;
				if(top.PSLandB == "Please select")
						{
							
							top.PSLandNameB ="";
							top.PSLandNoB ="";
						}
			}	
            SubmitToQueue("m_UIFramework.RefreshUI ()");
            break;
		case "LandlordName":
			if (sProdName == "A End Order Details")
				top.PSLandNameA = attValue;
			if (sProdName == "B End Order Details")
				top.PSLandNameB = attValue;
			break;
		case "LandlordContactNumber":
			if (sProdName == "A End Order Details")
				top.PSLandNoA = attValue;
			if (sProdName == "B End Order Details")
				top.PSLandNoB = attValue;
			break;
    }

   

    switch (attName) {
	case "Floor":
	  //debugger;
            if (ProdName == "A End Order Details")
                if (attValue == "" || attValue == null)
                    top.flagcheckA["Floor"] = "Y"
                else
                    top.flagcheckA["Floor"] = "N";
            else
            if (attValue == "" || attValue == null)
                top.flagcheckB["Floor"] = "Y";
            else
                top.flagcheckB["Floor"] = "N";
            break;
	case "Room":
            if (ProdName == "A End Order Details")
                if (attValue == "" || attValue == null)
                    top.flagcheckA["Room"] = "Y"
                else
                    top.flagcheckA["Room"] = "N";
            else
            if (attValue == "" || attValue == null)
                top.flagcheckB["Room"] = "Y";
            else
                top.flagcheckB["Room"] = "N";
            break;		
        
        case "Rack":
            if (ProdName == "A End Order Details")
                if (attValue == "" || attValue == null)
                    top.flagcheckA["Rack"] = "Y";
                else
                    top.flagcheckA["Rack"] = "N";
            else
            if (attValue == "" || attValue == null)
                top.flagcheckB["Rack"] = "Y";
            else
                top.flagcheckB["Rack"] = "N";
            break;
        case "Suite":
            if (ProdName == "A End Order Details")
                if (attValue == "" || attValue == null)
                    top.flagcheckA["Suite"] = "Y";
                else
                    top.flagcheckA["Suite"] = "N";
            else
            if (attValue == "" || attValue == null)
                top.flagcheckB["Suite"] = "Y";
            else
                top.flagcheckB["Suite"] = "N";
            break;
        case "LLUCNumber":
            if (attValue == "" || attValue == null)
                top.flagcheckA["LLUC Number"] = "Y";
            else
                top.flagcheckA["LLUC Number"] = "N";
            break;
        case "CircuitNoOfExistingFibreDeliveredService":
            if (ProdName == "A End Order Details")
                if (attValue == "" || attValue == null)
                    top.flagcheckA["Circuit number of the existing fibre delivered service"] = "Y";
                else
                    top.flagcheckA["Circuit number of the existing fibre delivered service"] = "N";
            else
            if (attValue == "" || attValue == null)
                top.flagcheckB["Circuit number of the existing fibre delivered service"] = "Y";
            else
                top.flagcheckB["Circuit number of the existing fibre delivered service"] = "N";
            break;
        case "LandlordContactNumber":
            if (ProdName == "A End Order Details")
                if (attValue == "" || attValue == null)
                    top.flagcheckA["Landlord contact number"] = "Y";
                else
                    top.flagcheckA["Landlord contact number"] = "N";
            else
            if (attValue == "" || attValue == null)
                top.flagcheckB["Landlord contact number"] = "Y";
            else
                top.flagcheckB["Landlord contact number"] = "N";
            break;
        case "LandlordName":
            if (ProdName == "A End Order Details")
                if (attValue == "" || attValue == null)
                    top.flagcheckA["Landlord name"] = "Y";
                else
                    top.flagcheckA["Landlord name"] = "N";
            else
            if (attValue == "" || attValue == null)
                top.flagcheckB["Landlord name"] = "Y";
            else
                top.flagcheckB["Landlord name"] = "N";
            break;
        case "LandlordsConsentGranted":
            if (ProdName == "A End Order Details")
                if (selectedAtt == "No") {
                    top.MandAttrA["Landlord name"] = null;
                    top.MandAttrA["Landlord contact number"] = null;
                    top.flagcheckA["Has Landlord consent been granted for A end?"] = "N";
                } else
                    top.flagcheckA["Has Landlord consent been granted for A end?"] = "N";

            else
            if (selectedAtt == "No") {
                top.MandAttrB["Landlord name"] = null;
                top.MandAttrB["Landlord contact number"] = null;
                top.flagcheckB["Has Landlord consent been granted for B end?"] = "N";
            } else
                top.flagcheckB["Has Landlord consent been granted for B end?"] = "N";
            break;
        case "CircuitNoOfExistingFibreDeliveredService":
            if (ProdName == "A End Order Details")
                if (attValue == "" || attValue == null)
                    top.flagcheckA["Circuit number of the existing fibre delivered service"] = "Y";
                else
                    top.flagcheckA["Circuit number of the existing fibre delivered service"] = "N";
            else
            if (attValue == "" || attValue == null)
                top.flagcheckB["Circuit number of the existing fibre delivered service"] = "Y";
            else
                top.flagcheckB["Circuit number of the existing fibre delivered service"] = "N";
            break;
    }
    // conditional mandatory end

    if (attName == "OOHPreference") {
        if (attValue == "Yes") {
            top.EXCLUDE_OOH = "Y";
        } else {
            top.EXCLUDE_OOH = "";
        }
    }

    if (attName == "OOHPreference")
        if (attValue == "Yes")
            top.OOH++;
        else
            top.OOH--;

    var attId = selectInfoPropSet.GetProperty("XA Id");
    var usage = selectInfoPropSet.GetProperty("Usage");
    var attValueOld = selectInfoPropSet.GetProperty("AttValueOld");
    var strParentPath = selectInfoPropSet.GetProperty("Parent Path");
    var td = null;

    if (usage == "TextBox") {
        attObj = document.getElementById("GRPITEM" + _pipe + strParentPath + _underscore + "ATTR" + _pipe + attId + _underscore + "ATTTYPE" + _pipe + "TEXT");
        if (attObj != null || bCFG_clientJsDebug)
            attObj.value = attValue;
    } else if (usage == "ComboBox") {
        //We don't have an empty option for Attributes.
        //So if the value is empty, we don't do anything
        //Not sure if this is the right thing to do though
        if (attValue != "" && typeof(attValue) != "undefined") {
            attObj = document.getElementById(strParentPath + _underscore + "ATTR" + _pipe + attId + _underscore + "ATTRDOMAIN" + _pipe + attValue);
            if (attObj != null || bCFG_clientJsDebug)
                attObj.selected = true;


            if (top.Quotation == "QUOTATION") {
                if (attName == "Bandwidth") {
                    top.Bandwidth = attValue;
                    top.ModifyBandwidth = attValue;
                } else if (attName == "Reach") {
                    top.Reach = attValue;
                    top.ModifyReach = attValue;
                }
            }
            //		End


            if ((top.BTCOM == "N") && (top.Modify != "")) {

                if (attName == "ResilienceOption") {
                    top.ModifyROCurrent = attValue;

                }

            }

        }

    } else if (usage == "Radio") {
        //We don't have an empty option for Attributes.
        //So if the value is empty, we don't do anything
        //Not sure if this is the right thing to do though
        if (attValue != "" && typeof(attValue) != "undefined") {
            td = attObj = null;
            td = document.getElementById(strParentPath + _underscore + "ATTR" + _pipe + attId + _underscore + "ATTVAL" + _pipe + attValue + _underscore + "FIELD" + _pipe + "Input");
            if (td != null || bCFG_clientJsDebug) {
                attObj = td.getElementsByTagName("input");
                if (attObj != null || bCFG_clientJsDebug)
                    attObj[0].checked = true;
            }

        }

        if (attValueOld != "" && typeof(attValueOld) != "undefined") {
            td = attObj = null;
            td = document.getElementById(strParentPath + _underscore + "ATTR" + _pipe + attId + _underscore + "ATTVAL" + _pipe + attValueOld + _underscore + "FIELD" + _pipe + "Input");
            if (td != null || bCFG_clientJsDebug) {
                attObj = td.getElementsByTagName("input");
                if (attObj != null || bCFG_clientJsDebug)
                    attObj[0].checked = false;
            }

        }
    }
	
	
}


function updateSelectionInfoForAttributeComboOrText(selectInfoPropSet) {
    var attObj = null;
    var attName = selectInfoPropSet.GetProperty("AttName");
    var attValue = selectInfoPropSet.GetProperty("AttValue");
    var attId = selectInfoPropSet.GetProperty("XA Id");
    var usage = selectInfoPropSet.GetProperty("Usage");
    var attValueOld = selectInfoPropSet.GetProperty("AttValueOld");
    var strParentPath = selectInfoPropSet.GetProperty("Parent Path");
    var td = null;

    if (usage == "TextBox") {
        attObj = document.getElementById("GRPITEM" + _pipe + strParentPath + _underscore + "ATTR" + _pipe + attId + _underscore + "ATTTYPE" + _pipe + "TEXT");
        attObj.value = attValue;
    } else if (usage == "ComboBox") {

        if (top.Quotation == "QUOTATION") {
            if (attName == "Bandwidth") {
                top.Bandwidth = attValue;
                top.ModifyBandwidth = attValue;
            } else if (attName == "Reach") {
                top.Reach = attValue;
                top.ModifyReach = attValue;
            }
        }
        //		End


        if (attName == "TRChargeBand") {
            top.TRChargeBand = attValue;
            top.TRC_OOH = attValue;

        }

        if (top.ECC_FLG == "Y" || top.ECC_FLG == "N") {
            if (attName == "ECChargeBand") {
                top.ECC_VAL_Current = attValue;
                top.ECC_VAL_Current = top.ECC_VAL_Current.toUpperCase();
            }
        }

        //We don't have an empty option for Attributes.
        //So if the value is empty, we don't do anything
        //Not sure if this is the right thing to do though
        //if (attValue != "" && typeof (attValue) != "undefined")
        //{
        if (document.getElementById(strParentPath + _underscore + "ATTR" + _pipe + attId + _underscore + "ATTRDOMAIN" + _pipe + attValue) != null) {
            attObj = document.getElementById(strParentPath + _underscore + "ATTR" + _pipe + attId + _underscore + "ATTRDOMAIN" + _pipe + attValue);
            attObj.selected = true;




            if ((top.Amend == "MRV") && (top.Amend == "BT")) {
                if (attName == "ResilienceViolationConfirmation") {
                    top.RVC = attValue;
                }
            }




        } else {


            attObj = document.getElementById("GRPITEM" + _pipe + strParentPath + _underscore + "ATTR" + _pipe + attId + _underscore + "ATTTYPE" + _pipe + "TEXT");
            attObj.value = attValue;

        }
        //}
    } else if (usage == "Radio") {
        //We don't have an empty option for Attributes.
        //So if the value is empty, we don't do anything
        //Not sure if this is the right thing to do though
        if (attValue != "" && typeof(attValue) != "undefined") {
            td = attObj = null;
            td = document.getElementById(strParentPath + _underscore + "ATTR" + _pipe + attId + _underscore + "ATTVAL" + _pipe + attValue + _underscore + "FIELD" + _pipe + "Input");
            attObj = td.getElementsByTagName("input");
            attObj[0].checked = true;
        }

        if (attValueOld != "" && typeof(attValueOld) != "undefined") {
            td = attObj = null;
            td = document.getElementById(strParentPath + _underscore + "ATTR" + _pipe + attId + _underscore + "ATTVAL" + _pipe + attValueOld + _underscore + "FIELD" + _pipe + "Input");
            attObj = td.getElementsByTagName("input");
            attObj[0].checked = false;
        }
    }
}

//for refreshing the control - used in validation.
function RP_updateSelectionInfoForAttributeRefresh(selectInfoPropSet) {
    var attObj = null;
    var attName = selectInfoPropSet.GetProperty("AttName");
    var attValue = selectInfoPropSet.GetProperty("AttValue");
    var attId = selectInfoPropSet.GetProperty("XA Id");
    var usage = selectInfoPropSet.GetProperty("Usage");
    var attValueOld = selectInfoPropSet.GetProperty("AttValueOld");
    var strParentPath = selectInfoPropSet.GetProperty("Parent Path");
    var td = null;
    if (usage == "TextBox") {
        attObj = document.getElementById("GRPITEM" + _pipe + strParentPath + _underscore + "ATTR" + _pipe + attId + _underscore + "ATTTYPE" + _pipe + "TEXT");
        attObj.value = attValue;
    } else if (usage == "ComboBox") {
        //We don't have an empty option for Attributes.
        //So if the value is empty, we don't do anything
        //Not sure if this is the right thing to do though
        if (attValue != "" && typeof(attValue) != "undefined") {
            attObj = document.getElementById(strParentPath + _underscore + "ATTR" + _pipe + attId + _underscore + "ATTRDOMAIN" + _pipe + attValue);
            attObj.selected = true;
        }
    } else if (usage == "Radio") {
        //We don't have an empty option for Attributes.
        //So if the value is empty, we don't do anything
        //Not sure if this is the right thing to do though
        if (attValue != "" && typeof(attValue) != "undefined") {
            td = attObj = null;
            td = document.getElementById(strParentPath + _underscore + "ATTR" + _pipe + attId + _underscore + "ATTVAL" + _pipe + attValue + _underscore + "FIELD" + _pipe + "Input");
            attObj = td.getElementsByTagName("input");
            attObj[0].checked = true;
        }

        if (attValueOld != "" && typeof(attValueOld) != "undefined") {
            td = attObj = null;
            td = document.getElementById(strParentPath + _underscore + "ATTR" + _pipe + attId + _underscore + "ATTVAL" + _pipe + attValueOld + _underscore + "FIELD" + _pipe + "Input");
            attObj = td.getElementsByTagName("input");
            attObj[0].checked = false;
        }
    }
    SubmitToQueue("m_UIFramework.RefreshUI ()");
}

function SR_updateExcludedItemForAttribute(exclItemPropSet) {
    var j = 0;
    var childPS = null;
    var grpItemId = "";
    var excluded = "";
    var id = "";
    var objectType = "";
    var optionId = "";
    var optionObj = null;
    var propName = "";
    var itemDomainPropSet = null;
    var itemPropSet = null;
    var resultPropSet = null;
    var rowId = "";
    var rowObj = null;
    var selectId = "";
    var selectObj = null;
    var strParentPath = "";
    var updateType = "";
    var usage = "";
    var dispArray = null;
    var dispFunction = null;

    nInstanceCount = exclItemPropSet.GetChildCount();
    id = exclItemPropSet.GetType();
    objectType = exclItemPropSet.GetProperty("Type");
    usage = exclItemPropSet.GetProperty("Usage");
    strParentPath = exclItemPropSet.GetProperty("Parent Path");
    //alert("Inside SR_updateExcludedItemForAttribute:"+"\n"+"nInstanceCount"+nInstanceCount+"ObjType:"+objectType);
    for (j = 0; j < nInstanceCount; j++) {
        var bGetFirst = true;
        var nPropertyCount = 0;
        var w = 0;

        childPS = null;
        updateType = "";

        //Disable/Enable
        childPS = exclItemPropSet.GetChild(j);
        updateType = childPS.GetType();

        nPropertyCount = childPS.GetPropertyCount();
        for (bGetFirst = true, w = 0; w < nPropertyCount; w++, bGetFirst = false) {
            excluded = "";
            grpItemId = "";
            itemDomainPropSet = null;
            propName = optionId = rowId = "";
            optionObj = null;
            rowObj = null;
            resultPropSet = null;
            itemPropSet = null;

            if (bGetFirst)
                propName = childPS.GetFirstProperty();
            else
                propName = childPS.GetNextProperty();

            if (objectType == "Attribute") {
                optionId = strParentPath + _underscore + "ATTR" + _pipe + id +
                    _underscore + "ATTRDOMAIN" + _pipe + propName;
                rowId = strParentPath + _underscore + "ATTR" + _pipe + id +
                    _underscore + "ATTVAL" + _pipe + propName;
            } else if (objectType == "Port") {
                optionId = strParentPath + _underscore + "PORT" + _pipe + id +
                    _underscore + "PORTDOMAIN" + _pipe + propName;
                rowId = strParentPath + _underscore + "PORT" + _pipe + id +
                    _underscore + "PROD" + _pipe + propName;
            }

            if (objectType == "Port")
                grpItemId = strParentPath + _underscore + "PORT" + _pipe + id;
            else if (objectType == "Attribute")
                grpItemId = strParentPath + _underscore + "ATTR" + _pipe + id;

            resultPropSet = m_UIFramework.m_controlPropSet.GetChildByType(grpItemId);
            //alert("resultPropSet"+resultPropSet);
            if (resultPropSet != null) {
                itemPropSet = resultPropSet.GetChildByType("Domain");
                //alert("itemPropSet"+itemPropSet);
                itemDomainPropSet = itemPropSet.GetChildByType(propName);
                //alert("itemPropSet"+itemPropSet);

                //Sometimes, people may screw up the rules to exclude something that doesn't exist
                if (itemDomainPropSet != null) {
                    excluded = itemDomainPropSet.GetProperty("Excluded");

                    optionObj = document.getElementById(optionId);
                    rowObj = document.getElementById(rowId);
                    if (optionObj != null) {
                        if (updateType == "Disable") {
                            optionObj.className = "eCfgOptionAvailable";
                            if (excluded == "Y") {
                                if (usage == "CheckBox" || usage == "QuantityList" || usage == "Radio") {
                                    if (rowObj != null)
                                        rowObj.style.display = "none";
                                } else if (usage == "ComboBox" || usage == "ComboBoxAdd") {
                                    var toBe = sequence[optionObj.parentElement.id];
                                    var asIs = sequence[asIsId];
                                    if (asIs > toBe) {
                                        optionObj.className = "eCfgOptionAvailable";
                                        return true;
                                    }
                                    optionObj.removeNode(false);
                                }
                            }
                        } else if (updateType == "Enable") {
                            optionObj.className = "eCfgOptionAvailable";
                            if (excluded == "Y") {
                                if (usage == "CheckBox" || usage == "QuantityList" || usage == "Radio") {
                                    if (rowObj != null)
                                        rowObj.style.display = "";
                                }
                            }
                        }
                    } else {
                        //This could happen for ComboBox or ComboBoxAdd that has .Excluded UI Property
                        if (updateType == "Enable" && excluded == "Y" && (usage == "ComboBox" || usage == "ComboBoxAdd")) {
                            if (objectType == "Port") {
                                selectId = strParentPath + _underscore + "PORT" + _pipe + id + _underscore + "DOMAINSELECT";
                                selectObj = document.getElementById(selectId);

                                if (selectObj != null || bCFG_clientJsDebug) {
                                    optionObj = document.createElement("OPTION");
                                    selectObj.options.add(optionObj);
                                    optionObj.id = optionId;
                                    optionObj.value = "GRPITEM" + _pipe + strParentPath + _underscore + "PORT" + _pipe + id +
                                        _underscore + "PROD" + _pipe + propName;
                                    optionObj.className = "eCfgOptionAvailable";
                                    optionObj.innerText = itemDomainPropSet.GetProperty("CxObjName");
                                }
                            } else if (objectType == "Attribute") {
                                var attType = "";

                                selectId = strParentPath + _underscore + "ATTR" + _pipe + id + _underscore + "DOMAINSELECT";
                                selectObj = document.getElementById(selectId);


                                if (selectObj != null || bCFG_clientJsDebug) {
                                    attType = resultPropSet.GetProperty("AttType");

                                    optionObj = document.createElement("OPTION");
                                    selectObj.options.add(optionObj);
                                    optionObj.id = optionId;
                                    optionObj.value = "GRPITEM" + _pipe + strParentPath + _underscore + "ATTR" + _pipe + id +
                                        _underscore + "ATTTYPE" + _pipe + attType + _underscore + "ATTVAL" + _pipe + propName;
                                    optionObj.className = "eCfgOptionAvailable";
                                    optionObj.innerText = propName;
                                }
                            }
                        }
                    }
                }
            } else {

            }
        }
    }
}

function setSequence(el) {
    asIsId = el.id;
    if (onlyOnce)
        return true;

    onlyOnce = true;
    var el1 = document.getElementsByTagName("SELECT");
    for (var i = 0; i < el1.length; i++)
        sequence[el1[i].id] = i;

    return true;
};


// JS Refactor Starts

function ROFalg(EADRO) {
    var Str = EADRO;

    if (top.Amend == "") {
        if (top.Modify == "") {
            if (Str.indexOf("Provide,") != -1)
                return "Y";
            else
                return "N";
        } else {
            if (Str.indexOf(top.Modify + ",") != -1) {
                return "Y";
            } else
                return "N";
        }
    } else {
        if (Str.indexOf(top.Type + "|") != -1) {
            var StatusStr = Str.substr(Str.indexOf(top.Type + "|")); // from PM
            var ReasonStr = StatusStr.substring(StatusStr.indexOf(",") + 1, StatusStr.length);
            ReasonStr = ReasonStr.toUpperCase();
            var PONAStr = top.PONAMatrix;
            PONAStr = PONAStr.toUpperCase();

            ReasonStr = PONAStr.substr(PONAStr.indexOf("|" + ReasonStr)); //from PM
            var Statusnum = ReasonStr.substring(ReasonStr.indexOf(",") + 1, ReasonStr.indexOf(";|"));

            var oStatusStr = PONAStr.substr(PONAStr.indexOf("|" + top.InterStatus)); // from order
            oStatusStr = oStatusStr.substring(oStatusStr.indexOf(",") + 1, oStatusStr.indexOf(";|"));


            if (oStatusStr < Statusnum)
                return "Y";
            else
                return "N";
        } else
            return "N";
    }
}
// JS Refactor Ends