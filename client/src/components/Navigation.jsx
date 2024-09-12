// import { Link, useMatch, useResolvedPath } from "react-router-dom"
// import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
// function Navigation() {
//    return(

    
//     <nav className = "nav">
//         <Link to = "/" className = "ThoughtList">
        
//         </Link>
//         <ul>
//             <CustomLink to = "/">Thoughts</CustomLink>
//             <CustomLink to = "/UserList">Users</CustomLink>
            
//             <CustomLink to = "/Profile">Profile</CustomLink>
//         </ul>
//     </nav>    
//    )
// }
// function CustomLink ({ to, children, ...props }){
//  const resolvedPath = useResolvedPath(to)  
//  const isActive = useMatch({ path: resolvedPath.pathname, end: true }) 
//     return(
//         <li className = {isActive ? "active" : ""}>
//             <Link to = {to} {...props}>
//                 {children}
//             </Link>
//         </li>
//     )
// }

// export default Navigation