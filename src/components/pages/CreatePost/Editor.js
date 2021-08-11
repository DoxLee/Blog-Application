import { Editor } from "@tinymce/tinymce-react";
import tinymce from "tinymce";

export default function TinyEditorComponent({ setContent }) {
  return (
    <>
      <Editor
        onBlur={(evt, editor) => setContent(() => editor.getContent())}
        init={{
          height: 600,
          selector: "#editor",
          toolbar:
            "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview | insertfile image media link anchor codesample | ltr rtl",
          menubar: "file edit view insert format tools table help",
          plugins:
            "preview paste importcss searchreplace autolink directionality code visualblocks visualchars fullscreen image link media codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons",
          toolbar_mode: "sliding",
          toolbar_sticky: true,
          autosave_ask_before_unload: true,
          image_title: true,
          contextmenu: "link image imagetools table",

          file_picker_types: "image",
          file_picker_callback: function (cb, value, meta) {
            var input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");

            input.onchange = function () {
              var file = this.files[0];

              var reader = new FileReader();
              reader.onload = function () {
                var id = "blobid" + new Date().getTime();
                var blobCache = tinymce.activeEditor.editorUpload.blobCache;
                var base64 = reader.result.split(",")[1];
                var blobInfo = blobCache.create(id, file, base64);
                blobCache.add(blobInfo);

                cb(blobInfo.blobUri(), { title: file.name });
              };
              reader.readAsDataURL(file);
            };

            input.click();
          },
          content_style:
            "body { font-family:Arial,Arial,sans-serif; font-size:16px }",
        }}
      />
    </>
  );
}
