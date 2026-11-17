/**
 * RSVP receiver for the Thilina & Shamla homecoming invitation.
 *
 * Setup (once):
 *  1. Open the Google Sheet → Extensions → Apps Script.
 *  2. Delete what is there, paste this whole file, click Save.
 *  3. Deploy → New deployment → type "Web app"
 *       Execute as:      Me
 *       Who has access:  Anyone
 *     → Deploy → authorise → copy the Web app URL (ends with /exec).
 *  4. Paste that URL into rsvpScriptUrl in app/data.ts.
 *
 * After editing this script later: Deploy → Manage deployments → Edit (pencil)
 * → Version: "New version" → Deploy. The URL stays the same.
 */

var SHEET_NAME = "RSVP";
var HEADERS = ["Timestamp", "Name", "Attending", "Guests"];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var data = JSON.parse(e.postData.contents);

    var name = String(data.name || "").trim().slice(0, 120);
    if (!name) return json({ result: "error", message: "Name is required" });

    var attending = data.attending === true;
    var guests = attending ? Math.max(1, Math.min(20, parseInt(data.guests, 10) || 1)) : 0;

    getSheet().appendRow([new Date(), name, attending ? "Yes" : "No", guests]);
    return json({ result: "success" });
  } catch (err) {
    return json({ result: "error", message: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Lets you open the /exec URL in a browser to check the deployment is live.
function doGet() {
  return json({ result: "ok", message: "RSVP endpoint is running" });
}

function getSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
