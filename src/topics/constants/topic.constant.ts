import {
  swaggerSchemaArr,
  swaggerSchemaExample,
} from 'src/common/utils/swagger.util';

export const TOPIC_CONST = {
  MODEL_NAME: 'topic',
  MODEL_PROVIDER: 'TOPIC_MODEL',
};

export const ADMIN_DEFAULT = [];

export const TOPIC_DEFAULT_PROFILE_IMG = {
  URL: '/public/images/topic-default.jpg',
};

export const EXCEPTION_TOPIC = {};

export const TOPIC_SWAGGER_RESPONSE = {};

export const TOPICS_DEFAULT = [
  {
    name: 'Family',
    description:
      'Gia đình (Family) là một nhóm gồm hai hoặc nhiều người có quan hệ ruột thịt, hôn nhân hoặc nhận con nuôi sống cùng nhau; tất cả những người có liên quan như vậy được coi là thành viên của một gia đình. Ví dụ, nếu một cặp vợ chồng lớn tuổi hơn, con gái và chồng của cô ấy cùng hai con và cháu trai của cặp vợ chồng lớn tuổi hơn đều sống trong cùng một ngôi nhà hoặc căn hộ; tất cả họ sẽ được coi là thành viên của một gia đình duy nhất.',
  },
  {
    name: 'School',
    description:
      'Trường học (School) là một tổ chức giáo dục được thiết kế để cung cấp không gian học tập và môi trường học tập cho việc giảng dạy của học sinh dưới sự chỉ đạo của giáo viên . Hầu hết các quốc gia đều có hệ thống giáo dục chính quy, đôi khi là bắt buộc. Trong các hệ thống này, học sinh tiến bộ thông qua một loạt các trường học.',
  },
  {
    name: 'Sport',
    description:
      'Thể thao là hoạt động thể chất hay kỹ năng dành cho mục đích giải trí, thi đấu, đạt đến vinh quang, rèn luyện bản thân, tăng cường sức khỏe',
  },
];
