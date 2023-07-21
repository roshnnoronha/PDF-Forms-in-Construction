'''''''''''''''''''''''''''''''''''''''''''''''''
''Program to Import XFDF Data to a Excel Table ''
''============================================ '' 
''                     (c) Roshn Noronha, 2022 ''
'''''''''''''''''''''''''''''''''''''''''''''''''
Option Explicit
'User defined type to hold all field names and values read from a XFDF file
Type fieldData
    name As String
    val As String
End Type
'A public sub-routine to import XFDF data to a table in excel
Sub import_xfdf_data()
 On Error GoTo er
 'Declaration of variables
 Dim filename As String
 Dim ln As String
 Dim filestr As String
 Dim pos As String
 Dim fieldValues() As fieldData
 Dim ctr As Long
 Dim endpos As Long
 Dim i As Long
 Dim j As Long
 Dim k As Long
 Dim keyValXL As String
 Dim keyValPDF As String
 Dim keyCol As Long
 Dim keyIndex As Long
 Dim row2Edit As Long
 'Read the XFDF file into a variable 'filestr'
 filename = Application.GetOpenFilename("XPDF Files, *.xfdf")
 If filename = "False" Then 
  msgbox "Unable to open file."
  Exit Sub
 end if
 Open filename For Input As #1
 Do While Not EOF(1)
  Line Input #1, ln
  filestr = filestr & ln & vbCrLf
 Loop
 Close #1
 'Parse the XFDF variable 'filestr' collecting all field names and values into 'fieldValues' data structure
 ctr = 0
 pos = 1
 Do While pos < Len(filestr)
  ReDim Preserve fieldValues(ctr)
  pos = InStr(pos, filestr, "<field name=")
  If pos > 0 Then
   pos = pos + 13
   endpos = InStr(pos, filestr, ">")
   fieldValues(ctr).name = un_esc(Mid(filestr, pos, endpos - pos - 1))  
   pos = InStr(pos, filestr, "<value>") + 7
   endpos = InStr(pos, filestr, "</value>")
   fieldValues(ctr).val = un_esc(Mid(filestr, pos, endpos - pos))
   ctr = ctr + 1
  Else
   pos = Len(filestr) + 1
  End If
 Loop
 'Iterate through the table in 'Sheet2' and find the key that the user as marked with 'y' in the third column 
 i = 1
 Do While Sheet2.Cells(i, 1) <> "" And i < 10000
  If LCase(Sheet2.Cells(i, 3)) = "y" Then
   keyValXL = Sheet2.Cells(i, 2)
   keyValPDF = Sheet2.Cells(i, 1)
   i = 10001
  End If
  i = i + 1
 Loop
 'find the key row in 'Sheet1'
 j = 1
 Do While Sheet1.Cells(1, j) <> "" And j < 10000
  If Sheet1.Cells(1, j) = keyValXL Then
   keyCol = j
   j = 10001
  End If
  j = j + 1
 Loop
 'find the index of the key in the 'fieldValues' variable
 For k = 0 To UBound(fieldValues)
  If fieldValues(k).name = keyValPDF Then
   keyIndex = k
   k = UBound(fieldValues) + 1
  End If
 Next k
 'based on the key we decide the row to edit. If the key does not exist we update a new row.
 i = 2
 Do While Sheet1.Cells(i, 1) <> ""
  If keyCol <> 0 And keyIndex <> 0 Then
   If Sheet1.Cells(i, keyCol) = fieldValues(keyIndex).val Then
    If MsgBox("Entry for " & fieldValues(keyIndex).name & " already exists. Do you want to update it?", vbYesNo, "Import data warning") = vbNo Then
     Exit Sub
    End If
    Exit Do
   End If
  End If
  i = i + 1
 Loop
 row2Edit = i
 'Update the row to edit with the data in 'fieldValues'
 j = 1
 Do While Sheet1.Cells(1, j) <> "" And j < 10000
  i = 2
  Do While Sheet2.Cells(i, 1) <> "" And i < 10000
   If Sheet2.Cells(i, 2) = Sheet1.Cells(1, j) Then
    For k = 0 To UBound(fieldValues)
     If fieldValues(k).name = Sheet2.Cells(i, 1) Then
      Sheet1.Cells(row2Edit, j) = fieldValues(k).val
     End If
    Next k
   End If
   i = i + 1
  Loop
  j = j + 1
 Loop
 Exit Sub
 'Finally some rudimentary error handling
 er:
 MsgBox err.Description
 Close #1
End Sub

'A function to remove all escape charactes from XML data 
Function un_esc(val As String) As String
 Dim ret As String
 ret = Replace(val, "&quot;", """")
 ret = Replace(ret, "&apos;", "'")
 ret = Replace(ret, "&lt;", "<")
 ret = Replace(ret, "&gt;", ">")
 ret = Replace(ret, "&amp;", "&")
 un_esc = ret
End Function