//首先连接MySQL数据库



//封装一个query方法，方便我们进行sql语句的执行
import mysql from 'mysql'
import { db,dbName } from '../config'
import fs from 'fs'
import path from 'path'
let pool
const sqlContent = fs.readFileSync(path.resolve(__dirname,'..','./sql/ct_blog.sql'),'utf-8')

//第一次连接数据库的时候，没有指定数据库名称，这次连接的目的是为了能够创建一个ct_blog数据库
//并且将数据文件执行，执行完毕后ct_blog数据库就有对应的表和数据了

const init = mysql.createConnection(db)
init.connect()
init.query('CREATE DATABASE ct_blog',err=>{
    Object.assign(db,dbName)
    //第二次连接数据库，这时候，数据库ct_blog已经创建成功了，这时候，直接连接ct_blog数据库
    //然后执行sql文件夹下的ct_blog.sql文件，对应的表和测试数据就已经存在数据库里面了
    pool = mysql.createPool(db)
    if(err){
        console.log(err)
        console.log('ct_blog database created already')
    }else{
        console.log('create ct_blog Database')
        query(sqlContent).then(red=>{
            console.log('import sql is success')
        }).catch(err=>{
            console.log('import sql is error')
            console.log(err)
        })
    }
})
init.end()

export default function query(sql,values){
    return new Promise((resolve,reject)=>{
        pool.getConnection((err,collection)=>{
            if(err){
                reject(err);
            }else{
                collection.query(sql,values,(err,data)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(data);
                    }
                    collection.release()
                })
            }
        })
    })
}
