// This is a generated file, modify: generate/templates/templates/struct_content.cc

#include <nan.h>
#include <string.h>
#ifdef WIN32
#include <windows.h>
#else
#include <unistd.h>
#endif // win32

extern "C" {
  #include <git2.h>
 }

#include <iostream>
#include "../include/nodegit.h"
#include "../include/lock_master.h"
#include "../include/functions/copy.h"
#include "../include/remote_create_options.h"
#include "nodegit_wrapper.cc"

  #include "../include/repository.h"
 
using namespace v8;
using namespace node;
using namespace std;


// generated from struct_content.cc
GitRemoteCreateOptions::GitRemoteCreateOptions() : NodeGitWrapper<GitRemoteCreateOptionsTraits>(NULL, true, v8::Local<v8::Object>())
{
        git_remote_create_options wrappedValue = GIT_REMOTE_CREATE_OPTIONS_INIT;
      this->raw = (git_remote_create_options*) malloc(sizeof(git_remote_create_options));
      memcpy(this->raw, &wrappedValue, sizeof(git_remote_create_options));
  
  this->ConstructFields();
}

GitRemoteCreateOptions::GitRemoteCreateOptions(git_remote_create_options* raw, bool selfFreeing, v8::Local<v8::Object> owner)
 : NodeGitWrapper<GitRemoteCreateOptionsTraits>(raw, selfFreeing, owner)
{
  this->ConstructFields();
}

GitRemoteCreateOptions::~GitRemoteCreateOptions() {
             this->repository.Reset();
             }

void GitRemoteCreateOptions::ConstructFields() {
             v8::Local<Object> repositoryTemp = Nan::To<v8::Object>(GitRepository::New(
this->raw->repository,
            false
          )).ToLocalChecked();
          this->repository.Reset(repositoryTemp);

             }

void GitRemoteCreateOptions::InitializeComponent(v8::Local<v8::Object> target) {
  Nan::HandleScope scope;

  v8::Local<FunctionTemplate> tpl = Nan::New<FunctionTemplate>(JSNewFunction);

  tpl->InstanceTemplate()->SetInternalFieldCount(1);
  tpl->SetClassName(Nan::New("RemoteCreateOptions").ToLocalChecked());

      Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("version").ToLocalChecked(), GetVersion, SetVersion);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("repository").ToLocalChecked(), GetRepository, SetRepository);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("name").ToLocalChecked(), GetName, SetName);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("fetchspec").ToLocalChecked(), GetFetchspec, SetFetchspec);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("flags").ToLocalChecked(), GetFlags, SetFlags);
   
  InitializeTemplate(tpl);

  v8::Local<Function> _constructor_template = Nan::GetFunction(tpl).ToLocalChecked();
  constructor_template.Reset(_constructor_template);
  Nan::Set(target, Nan::New("RemoteCreateOptions").ToLocalChecked(), _constructor_template);
}

    NAN_GETTER(GitRemoteCreateOptions::GetVersion) {

      GitRemoteCreateOptions *wrapper = Nan::ObjectWrap::Unwrap<GitRemoteCreateOptions>(info.This());

        info.GetReturnValue().Set(Nan::New<Number>(wrapper->GetValue()->version));
     }

    NAN_SETTER(GitRemoteCreateOptions::SetVersion) {
      GitRemoteCreateOptions *wrapper = Nan::ObjectWrap::Unwrap<GitRemoteCreateOptions>(info.This());

         if (value->IsNumber()) {
          wrapper->GetValue()->version = (unsigned int) Nan::To<int32_t>(value).FromJust();
        }
     }

      NAN_GETTER(GitRemoteCreateOptions::GetRepository) {

      GitRemoteCreateOptions *wrapper = Nan::ObjectWrap::Unwrap<GitRemoteCreateOptions>(info.This());

        info.GetReturnValue().Set(Nan::New(wrapper->repository));

     }

    NAN_SETTER(GitRemoteCreateOptions::SetRepository) {
      GitRemoteCreateOptions *wrapper = Nan::ObjectWrap::Unwrap<GitRemoteCreateOptions>(info.This());

        v8::Local<Object> repository(Nan::To<v8::Object>(value).ToLocalChecked());

        wrapper->repository.Reset(repository);

        wrapper->raw->repository =   Nan::ObjectWrap::Unwrap<GitRepository>(Nan::To<v8::Object>(repository).ToLocalChecked())->GetValue() ;

     }

      NAN_GETTER(GitRemoteCreateOptions::GetName) {

      GitRemoteCreateOptions *wrapper = Nan::ObjectWrap::Unwrap<GitRemoteCreateOptions>(info.This());

        if (wrapper->GetValue()->name) {
          info.GetReturnValue().Set(Nan::New<String>(wrapper->GetValue()->name).ToLocalChecked());
        }
        else {
          return;
        }

     }

    NAN_SETTER(GitRemoteCreateOptions::SetName) {
      GitRemoteCreateOptions *wrapper = Nan::ObjectWrap::Unwrap<GitRemoteCreateOptions>(info.This());

        if (wrapper->GetValue()->name) {
        }

        Nan::Utf8String str(value);
        wrapper->GetValue()->name = strdup(*str);

     }

      NAN_GETTER(GitRemoteCreateOptions::GetFetchspec) {

      GitRemoteCreateOptions *wrapper = Nan::ObjectWrap::Unwrap<GitRemoteCreateOptions>(info.This());

        if (wrapper->GetValue()->fetchspec) {
          info.GetReturnValue().Set(Nan::New<String>(wrapper->GetValue()->fetchspec).ToLocalChecked());
        }
        else {
          return;
        }

     }

    NAN_SETTER(GitRemoteCreateOptions::SetFetchspec) {
      GitRemoteCreateOptions *wrapper = Nan::ObjectWrap::Unwrap<GitRemoteCreateOptions>(info.This());

        if (wrapper->GetValue()->fetchspec) {
        }

        Nan::Utf8String str(value);
        wrapper->GetValue()->fetchspec = strdup(*str);

     }

      NAN_GETTER(GitRemoteCreateOptions::GetFlags) {

      GitRemoteCreateOptions *wrapper = Nan::ObjectWrap::Unwrap<GitRemoteCreateOptions>(info.This());

        info.GetReturnValue().Set(Nan::New<Number>(wrapper->GetValue()->flags));
     }

    NAN_SETTER(GitRemoteCreateOptions::SetFlags) {
      GitRemoteCreateOptions *wrapper = Nan::ObjectWrap::Unwrap<GitRemoteCreateOptions>(info.This());

         if (value->IsNumber()) {
          wrapper->GetValue()->flags = (unsigned int) Nan::To<int32_t>(value).FromJust();
        }
     }

   
// force base class template instantiation, to make sure we get all the
// methods, statics, etc.
template class NodeGitWrapper<GitRemoteCreateOptionsTraits>;
