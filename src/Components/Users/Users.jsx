import React from 'react';
import s from '../Messages/Messages.module.css';
import style from './Users.module.css';
import avatar from '../../assets/images/icon.png';
import Preloader from "../common/Preloader/Preloader";
import {NavLink} from "react-router-dom";


let Users = (props) => {

   let pages = [];
   let pagesCount = Math.ceil(props.totalPages / props.count);

   for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
   }

   return (
      <div>
         <h2 className={s.title}>Users</h2>

         <div className={style.pages}>
           {
             pages.map((p) => <span onClick={() => {
                props.onPageChanger(p)
             }} className={props.page === p && style.selectedPage}>{p}</span>)
            }
         </div>

         {props.isFetching ? <Preloader/> : null}

         <div className={style.scroll}>
            {props.users.map((u) => <div className={style.following} key={u.id}>
               <div className={style.mainInfo}>
                  <div>
                     <NavLink to={'profile/' + u.id} className={style.avatar}>
                        <img src={u.photos.small != null ? u.photos.small : avatar} alt=""/>
                     </NavLink>
                  </div>

                  <div className={style.aboutUser}>
                     <div>
                        <div>{u.name}</div>
                        <div className={style.userStatus}>{u.status}</div>
                     </div>
                     <div className={style.location}>
                        <div>{'u.location.country'},</div>
                        <div>{'u.location.city'}</div>
                     </div>
                  </div>
               </div>
               <div>
                  {u.followed
                     ? <button disabled={props.followingIsProgress.some(id => id === u.id)} className={style.btn} onClick={() => {
                        props.unfollow(u.id)
                     }}>Unfollow</button>
                     : <button disabled={props.followingIsProgress.some(id => id === u.id)} className={style.btn} onClick={() => {
                        props.follow(u.id)
                     }}>Follow</button>
                  }
               </div>
            </div>)}

         </div>

      </div>
   )
}

export default Users;