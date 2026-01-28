const User = require('../schemas/user');
const bcrypt = require('bcrypt');
module.exports.updateProfile=async (req,res)=>{
    const {name,address}=req.body;
    console.log(req.body);
    try{
        const user=await User.findByIdAndUpdate(req.user._id, {name,address}, {new: true});
        return res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            user
        });
    }catch(error){
        console.error('Update profile error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
}

module.exports.changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    
    try {
        // Get user from database
        const user = await User.findById(req.user._id);
        
        // Check if current password matches
        const isMatch = await user.matchPassword(currentPassword);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Current password is incorrect'
            });
        }
        
        // Hash new password before saving
        const bcrypt = require('bcrypt');
        const saltRounds = 10;
        user.password = await bcrypt.hash(newPassword, saltRounds);
        await user.save();
        
        return res.status(200).json({
            success: true,
            message: 'Password changed successfully'
        });
    } catch (error) {
        console.error('Change password error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};