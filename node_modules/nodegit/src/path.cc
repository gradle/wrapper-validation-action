// This is a generated file, modify: generate/templates/templates/class_content.cc

#include <nan.h>
#include <string.h>

extern "C" {
  #include <git2.h>
    #include <git2/sys/path.h>
 }

#include "../include/nodegit.h"
#include "../include/lock_master.h"
#include "../include/functions/copy.h"
#include "../include/path.h"
#include "nodegit_wrapper.cc"
#include "../include/async_libgit2_queue_worker.h"

 
#include <iostream>

using namespace std;
using namespace v8;
using namespace node;

 
  void GitPath::InitializeComponent(v8::Local<v8::Object> target) {
    Nan::HandleScope scope;

       v8::Local<Object> object = Nan::New<Object>();
         Nan::SetMethod(object, "isGitfile", IsGitfile);
  
    Nan::Set(
      target,
      Nan::New("Path").ToLocalChecked(),
         object
     );
  }

  
/*
 * @param String path
   * @param Number pathlen
   * @param Number gitfile
   * @param Number fs
     * @return Number  result    */
NAN_METHOD(GitPath::IsGitfile) {
  Nan::EscapableHandleScope scope;

  if (info.Length() == 0 || !info[0]->IsString()) {
    return Nan::ThrowError("String path is required.");
  }

  if (info.Length() == 1 || !info[1]->IsNumber()) {
    return Nan::ThrowError("Number pathlen is required.");
  }

  if (info.Length() == 2 || !info[2]->IsNumber()) {
    return Nan::ThrowError("Number gitfile is required.");
  }

  if (info.Length() == 3 || !info[3]->IsNumber()) {
    return Nan::ThrowError("Number fs is required.");
  }

// start convert_from_v8 block
  const char * from_path = NULL;

  Nan::Utf8String path(Nan::To<v8::String>(info[0]).ToLocalChecked());
  // malloc with one extra byte so we can add the terminating null character C-strings expect:
  from_path = (const char *) malloc(path.length() + 1);
  // copy the characters from the nodejs string into our C-string (used instead of strdup or strcpy because nulls in
  // the middle of strings are valid coming from nodejs):
  memcpy((void *)from_path, *path, path.length());
  // ensure the final byte of our new string is null, extra casts added to ensure compatibility with various C types
  // used in the nodejs binding generation:
  memset((void *)(((char *)from_path) + path.length()), 0, 1);
// end convert_from_v8 block
// start convert_from_v8 block
  size_t from_pathlen;
      from_pathlen = (size_t)   info[1].As<v8::Number>()->Value();
// end convert_from_v8 block
// start convert_from_v8 block
  git_path_gitfile from_gitfile;
      from_gitfile = (git_path_gitfile)  (int) info[2].As<v8::Number>()->Value();
// end convert_from_v8 block
// start convert_from_v8 block
  git_path_fs from_fs;
      from_fs = (git_path_fs)  (int) info[3].As<v8::Number>()->Value();
// end convert_from_v8 block

  git_error_clear();

  { // lock master scope start
    LockMaster lockMaster(
      /*asyncAction: */false
            ,
              from_path
    );

 int result =     git_path_is_gitfile(
          from_path
,          from_pathlen
,          from_gitfile
,          from_fs
    );


      v8::Local<v8::Value> to;
// start convert_to_v8 block
     to = Nan::New<Number>( result);
  // end convert_to_v8 block
        return info.GetReturnValue().Set(scope.Escape(to));
  }
}
     