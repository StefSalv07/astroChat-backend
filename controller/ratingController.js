const Rating = require("../model/ratingModel");
const mongoose = require("mongoose");

exports.addRating = async (req, res) => {
  try {
    const { userId, review, rating, astroId } = req.body;
    const newRating = new Rating({ userId, review, rating ,astroId});
    await newRating.save();
    res
      .status(201)
      .json({ data: newRating, message: "rating added successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getRatingByAstrologerId = async (req, res) => {
  try {
    const { astroId } = req.params;

    const ratings = await Rating.aggregate([
      {
        $match: { astroId: new mongoose.Types.ObjectId(astroId) }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'userDetails',
        }
      },
      {
        $project: {
          astroId: 1,
          user: { $arrayElemAt: ['$userDetails', 0] },
          review: 1,
          rating: 1
        }
      }
    ]);

    if (!ratings || ratings.length === 0) {
      return res
        .status(404)
        .json({ message: "No ratings found for this astrologer", status: 404 });
    }

    res.status(200).json({
      data: ratings,
      message: "Astrologer Ratings retrieved successfully",
      status: 200,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};