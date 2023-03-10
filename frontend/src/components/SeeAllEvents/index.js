// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useModal } from "../../context/Modal";
// import "../GroupComponents/SeeAllGroups/SeeAllGroups.css"
// import { getAllGroups } from "../../store/groups";
// import EventsGroupsNav from "../EventsGroupsNav";

// function SeeAllEvents() {
//     const dispatch = useDispatch();

//     const { closeModal } = useModal();

//     const groups = useSelector(state => {
//         return state.groups.allGroups
//     })

//     let groupsArr = groups.map((group, idx) => {
//         return (
//             <div>
//                 <div className="groupContainer">
//                     <img className="allGroupsImg" src="https://res.cloudinary.com/dkul3ouvi/image/upload/v1677439417/5498791_i3opa9.jpg" alt="https://www.freepik.com/free-vector/solidarity-concept-illustration_14562369.htm#query=friends&position=4&from_view=search&track=sph"></img>
//                     <div>
//                         <h3>{group.name}</h3>
//                         <h4>{group.city}</h4>
//                         <p>{group.about}</p>
//                         <div>
//                             {group.private && <h4>private</h4>}
//                             {!group.private && <h4>public</h4>}
//                         </div>
//                     </div>
//                 </div>

//             </div>
//         )
//     })

//     useEffect(() => {
//         dispatch(getAllGroups())
//     }, [dispatch])

//     return (
//         <div className="seeAllGroupsMainDiv">
//             <EventsGroupsNav />
//             <h2> Events in Meetup </h2>
//             {groupsArr}
//         </div>
//     );
// }

// export default SeeAllEvents;
