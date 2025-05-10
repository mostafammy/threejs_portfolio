import {FooterLinks} from "../constants/index.js";

const Footer = () => {
    const Current_Year = new Date().getFullYear();
    return (
        <section
            className={'c-space pt-3 pb-7 border-t border-black-300 flex justify-between items-center flex-wrap gap-5'}>
            <div className={'text-white-600 flex gap-2'}>
                <p>Terms & Conditions</p>
                <p> | </p>
                <p>Privacy Policy</p>
            </div>
            <div className={'flex gap-3'}>
                {
                    FooterLinks.map(({id, name, IconSrc, alt, link}) => {
                        return (
                            <div className={'social-icon'} key={id} id={name} onClick={() => {
                                window.open(link, '_blank');
                            }}>
                                <img src={IconSrc} alt={alt} className={'w-1/2 h-1/2'}/>
                            </div>
                        );
                    })
                }
            </div>
            <p className={'text-white-500'}>
                {`© ${Current_Year} Mostafa Yaser . All Rights Reserved.`}
            </p>
        </section>
    )
}
export default Footer
