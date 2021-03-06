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
    pool = mysql.createPool(db)
    if(err){
        console.log("数据库已存在")
    }else{
        query(sqlContent).then(res=>{
            console.log('数据库创建成功')
        }).catch(err=>{
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
