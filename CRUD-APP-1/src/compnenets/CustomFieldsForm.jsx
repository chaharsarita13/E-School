/* eslint-disable react/prop-types */
// import "../style/AddStudent.scss";
// import { Fragment } from "react";
// const CustomFieldsForm = ({
//   customFieldsData,
//   customFields,
//   handleCustomFieldChange,
// }) => {
//   const handleInputChange = (customFieldId, value, type) => {
//     handleCustomFieldChange(customFieldId, value, type);
//   };

//   return (
//     <div className="customContainer">
//       <Fragment>
//         {customFieldsData.map((group) => (
//           <div key={group.groupname}>
//             <span className="groupText">{group.groupname}</span>
//             <div className="customGroup">
//               <Fragment>
//                 {group.sections.map((section) => (
//                   <div key={section.section}>
//                     <span className="sectionText">{section.section}</span>
//                     <div className="customSection">
//                       <div className="customLabel">
//                         {section.fields.map((field) => (
//                           <div key={field._id}>
//                             <span className="labelText">{field.label}:</span>
//                             {field.type === "input" && (
//                               <input
//                                 className="labelInput"
//                                 // type="text"
//                                 value={customFields[field._id] || ""}
//                                 onChange={(e) =>
//                                   handleInputChange(
//                                     field._id,
//                                     e.target.value,
//                                     field.type
//                                   )
//                                 }
//                               />
//                             )}
//                             {field.type === "checkbox" && (
//                               <input
//                                 className="inputLabel"
//                                 type="checkbox"
//                                 checked={customFields[field._id] || false}
//                                 onChange={(e) =>
//                                   handleInputChange(
//                                     field._id,
//                                     e.target.checked,
//                                     field.type
//                                   )
//                                 }
//                               />
//                             )}
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </Fragment>
//             </div>
//           </div>
//         ))}
//       </Fragment>
//     </div>
//   );
// };

// export default CustomFieldsForm;