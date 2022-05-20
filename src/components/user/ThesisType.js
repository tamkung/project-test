import React from "react";
import * as FaIcons from 'react-icons/fa';
import * as FiIcons from 'react-icons/fi';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as BsIcons from 'react-icons/bs';
import * as BiIcons from 'react-icons/bi';
import * as ImIcons from 'react-icons/im';
import * as GiIcons from 'react-icons/gi';
import * as WiIcons from 'react-icons/wi';
import * as GoIcons from 'react-icons/go';
import * as GrIcons from 'react-icons/gr';
import * as HiIcons from 'react-icons/hi';
import * as RiIcons from 'react-icons/ri';
import * as SiIcons from 'react-icons/si';
import * as TiIcons from 'react-icons/ti';
import * as MdIcons from 'react-icons/md';


export const ThesisType = [

    {
        title: 'เว็บไซต์',
        icons: <MdIcons.MdOutlineWebAsset style={{ margin: "2px" }} size={20} />,
        path: '/webtype',
        value: 'เว็บไซต์',
        color: 'red',
        length: "WebThesis.length"
    },
    {
        title: 'แอปพลิเคชัน',
        icons: <BiIcons.BiMobileAlt style={{ margin: "2px" }} size={20} />,
        path: '/apptype',
        value: 'แอปพลิเคชัน',
        color: 'red',
        length: 'AppThesis.length'
    },
    {
        title: 'อุปกรณ์ iot',
        icons: <GiIcons.GiSolarPower style={{ margin: "2px" }} size={20} />,
        path: '/iottype',
        value: 'อุปกรณ์ iot',
        color: 'red',
        length: 'IotThesis.length'
    },
    {
        title: 'สื่อการเรียนรู้',
        icons: <FiIcons.FiMonitor style={{ margin: "2px" }} size={20} />,
        path: '/mediatype',
        value: 'สื่อการเรียนรู้',
        color: 'red',
        length: '{TeachThesis.length}'
    },
    {
        title: 'เกม',
        icons: <BiIcons.BiGame style={{ margin: "2px" }} size={20} />,
        path: '/gametype',
        value: 'เกม',
        color: 'red',
        length: '{GameThesis.length}'
    },
    {
        title: 'VR AR MR',
        icons: <SiIcons.SiIngress style={{ margin: "2px" }} size={20} />,
        path: '/xrtype',
        value: 'VR AR MR',
        color: 'red',
        length: '{VrThesis.length}'
    },
    {
        title: 'อื่นๆ',
        icons: <BsIcons.BsThreeDots style={{ margin: "2px" }} size={20} />,
        path: '/othertype',
        value: 'อื่นๆ',
        color: 'red',
        length: '{OtherThesis.length}'
    },
]