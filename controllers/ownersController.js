// const Owners = require("../models/Owners");
// const Users = require("../models/Users");
//     //read
// const getAllOwners = async (req, res) => {
//         const owner = await Owners.find().lean()
//         if (!owner?.length) {
//         return res.status(400).json({ message: 'No owner found' })
//         }
//         // console.log(users);
//         res.json(owner)
//         }
// const getFilterOwners = async (req, res) => {
//         const {obj} = req.params
//         const owner = await Owners.find().populate("Users",{nameUser:obj}).lean()
//         if (!owner?.length) {
//         return res.status(400).json({ message: 'No owner found' })
//         }
//         res.json(owner)
//         }
// const getOwnersById = async (req, res) => {
//         const {id} = req.params
//         const owner = await Owners.findById(id).lean()
//         if (!owner) {
//         return res.status(400).json({ message: 'No owner' })
//         }
//         res.json(owner)
//         }
//         //יביאו מספר רכב ויתקבל האדם
//         // בcarיביאו אדם ויגיעו הרכבים
// //  const getUserByEmail = async (req, res) => {
// //             const {obj} = req.body
// //             const user = await Users.find(obj).lean()
// //             if (!user) {
// //             return res.status(400).json({ message: 'No user' })
// //             }
// //             res.json(user)
// //             }

// const updateUser = async (req, res) => {
//     const {id}=req.params
//     const {isHandicappedOwner, idHandicappedOwner, nameUser, rolesUser,idUser,emailUser,passwordUser,phoneUser}= req.body
//     if (!id || !emailUser||idUser||passwordUser ) {
//     return res.status(400).json({ message: 'fields are required'})
//     }
//     const duplicate = await Owners.findOne().populate('Users',{ nameUser: nameUser }).lean()
//     const duplicate2 = await Owners.findOne().populate('Users',{ idUser: idUser }).lean()
//     if (duplicate&&duplicate.id!=id) {
//         return res.status(409).json({ message: "Duplicate username" })
//     }
//     if (duplicate2&&duplicate2.id!=id) {
//         return res.status(409).json({ message: "Duplicate idUser" })
//     }
//     const owner = await Owners.findById(id).populate('Users').exec()
//     if (!owner) {
//     return res.status(400).json({ message: 'owner not found' })
//     }
//     const ownerUser = await Users.findById(owner.userOwner).exec()
//     if (!ownerUser) {
//         return res.status(400).json({ message: 'ownerUser not found' })
//     }
    
// //     if (rolesUser.find(rl=>rl==="manager"&&(!ownerUser.rolesUser.find(rl=>rl==="manager")))){
// // const allParkManager=allParkManager

// //     }

//     isHandicappedOwner?owner.isHandicappedOwner = isHandicappedOwner:user.isHandicappedOwner
//     emailUser?ownerUser.emailUser = emailUser:ownerUser.emailUser
//    idHandicappedOwner?owner.idHandicappedOwner = idHandicappedOwner:user.idHandicappedOwner
//    phoneUser?ownerUser.phoneUser = phoneUser:ownerUser.phoneUser
//     rolesUser?ownerUser.rolesUser = [...rolesUser]:ownerUser.rolesUser
//     nameUser?ownerUser.nameUser = nameUser:ownerUser.nameUser
//     idUser?ownerUser.idUser = idUser:ownerUser.idUser
//     const hashedPwd = await bcrypt.hash(password, 10)
//     ownerUser.password = hashedPwd
//     phoneUser?ownerUser.phoneUser = phoneUser:ownerUser.phoneUser
//     const updateUsers = await ownerUser.save()
//     const updateUsers2 = await owner.save()
//     const users2 = await owner.find().lean()
//     if (!users2?.length) {
//     return res.status(400).json({ message: 'No users found' })
//     }
//     res.json(users2)   
//  }
// //delet


// // const deleteKid = async (req, res) => {
// //     const { id } = req.params
// //     if (!id) {
// //         return res.status(400).send("id is required")
// //     }
// //     const kid = await Kid.findById(id).exec()
// //     if (!kid) {
// //         return res.status(400).send("kid not found")
// //     }
// //     const user = await User.findById(kid.useridref).exec()
// //     if (!user) {
// //         return res.status(400).send("user not found")
// //     }
// //     const resultKid = await kid.deleteOne()
// //     const resultUser = await user.deleteOne()
// //     const kids = await Kid.find({ parentid: kid.parentid }).lean()
// //     if (!kids) {
// //         return res.status(400).send("kids not found")
// //     }
// //     const users = await Promise.all(kids.map(async (kid) => {
// //         const user = await User.findById(kid.useridref).lean()
// //         if (!user) {
// //             return res.status(400).send("user not found")
// //         }
// //         const obj = { kid, user }
// //         console.log(obj)
// //         return obj
// //     }))

// //     res.json(users)

// // }


// const deleteOwners = async (req, res) => {
//     const { id } = req.params
//     if (!id) {
//         return res.status(400).send("id is required")
//     }
//     const owners = await Owners.findById(id).exec()
//     if (!owners) {
//     return res.status(400).json({ message: 'owners not found' })
//     }
//     const user = await Users.findById(owners.userOwner.id).exec()
//     if (!user) {
//         return res.status(400).send("user not found")
//     }
//     if(user.rolesUser.length===1){
//         await user.deleteOne()
//         }
//     else{
//             user.rolesUser=user.rolesUser.filter(role=>role!="owner")
//              await user.save()
//         }

//  const app=async(a)=>{await a.deleteOne()}
// //         const cars2 =owners.allCarsOwner
// //         cars2.map((a)=>{app(a)})


// //למחוק מערך רכבים


//     const cars = await Cars.find().populate("Owners",{_id:id}).lean()
//     if (!cars) {
//             return res.status(400).send("cars not found")
//         }
    
//     // const cars = await Cars.find({ownerCar:owners.id}).exec()
//      cars.map((a)=>{app(a)})
//      await owners.deleteOne()
//     const owners2 = await Owners.find().lean() 
//         if (!owners2) {
//         return res.status(400).json({ message: 'No owners found' })
//         }
//         res.json(owners2)
//     }

//     module.exports = {
//     //     createNewUsers,
//     //     getAllUsers,
//          getOwnersById,
//     //     updateUser,
//        getAllOwners,
//     deleteOwners,
//     getFilterOwners
      
//          }