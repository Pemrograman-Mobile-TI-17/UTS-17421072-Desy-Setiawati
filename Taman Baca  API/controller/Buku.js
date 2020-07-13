const buku = require('../model/Buku.js')
const response = require('../config/response')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

exports.inputDataBuku = (data, gambar) =>
    new Promise(async (resolve, reject)=>{

        const bukuBaru = new buku({
            kodeBuku : data.kodeBuku,
            judulBuku: data.judulBuku,
            penerbit: data.penerbit,
            pengarang: data.pengarang,
            tahunTerbit: data.tahunTerbit,
            hargaBuku: data.hargaBuku,
            gambar: gambar
        })
        await buku.findOne({kodeBuku: data.kodeBuku})
            .then(buku => {
                if (buku){
                    reject(response.commonErrorMsg('Kode buku sudah digunakan'))
                }else {
                    bukuBaru.save()
                        .then(r=>{
                            resolve(response.commonSuccessMsg('Berhasil Menginput Data'))
                    }).catch(err => {
                            reject(response.commonErrorMsg('Mohon Maaf Input Buku Gagal'))
                    })
                }

            }).catch(err =>{
                reject(response.commonErrorMsg('Mohon Maaf Terjadi Kesalahan Pada Server Kami'))
        })
    })

exports.LihatDataBuku =()=>
    new Promise(async(resolve, reject)=>{
       await buku.find({})
           .then(result=>{
               resolve(response.commonResult(result))
           })
           .catch(()=>reject(response.commonErrorMsg('Mohon Maaf Terjadi Kesalahan Pada Server Kami')))

    })

exports.LihatDetailDataBuku =(kodeBuku)=>
    new Promise(async(resolve, reject)=>{
        await buku.findOne({kodeBuku: kodeBuku})
            .then(result=>{
                resolve(response.commonResult(result))
            })
            .catch(()=>reject(response.commonErrorMsg('Mohon Maaf Terjadi Kesalahan Pada Server Kami')))

    })


exports.updateBuku = (id, data, gambar)=>
    new Promise(async(resolve, reject)=>{
        await buku.updateOne(
            {_id : ObjectId(id)},
            {
                $set: {
                    kodeBuku : data.kodeBuku,
                    judulBuku: data.judulBuku,
                    penerbit: data.penerbit,
                    pengarang: data.pengarang,
                    tahunTerbit: data.tahunTerbit,
                    hargaBuku: data.hargaBuku,
                    gambar: gambar
                }
            }
        ).then(buku=>{
            resolve(response.commonSuccessMsg('Berhasil Mengubah Data'))
        }).catch(err=>{
            reject(response.commonErrorMsg('Mohon Maaf Terjadi Kesalahan Pada Server Kami'))
        })
    })

exports.hapusbuku = (_id)=>
    new Promise(async (resolve, reject)=>{
        await buku.remove({_id: ObjectId(_id)})
            .then(()=>{
            resolve(response.commonSuccessMsg('Berhasil Menghapus Data'))
        }).catch(()=>{
                reject(response.commonErrorMsg('Mohon Maaf Terjadi Kesalahan Pada Server Kami'))
            })
    })